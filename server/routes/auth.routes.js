const express = require("express");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");
const tokenService = require("../services/token.service");
const { check, validationResult } = require("express-validator");
const { generateUserData } = require("../utils/helper");
const User = require("../models/User");

const signUpValidations = [
    check("email", "Не короектный email").isEmail(),
    check("password", "Пароль должен быть меньше 8 символов").isLength({
        min: 8,
    }),
];

router.post("/signUp", [
    signUpValidations,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                    },
                });
            }
            const { email, password } = req.body;
            const exitingUser = await User.findOne({ email });
            if (exitingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXIST",
                        code: 400,
                    },
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await User.create({
                ...generateUserData(),
                ...req.body,
                password: hashedPassword,
            });

            const tokens = tokenService.generate({ _id: newUser._id });
            await tokenService.save(newUser._id, tokens.refreshToken);
            res.status(201).send({ ...tokens, userId: newUser._id });
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка",
            });
        }
    },
]);
// 1 validation
// 2 find user
// 3 compare hash password
// 4 generate token
// 5 return token
router.post("/signInWithPassword", [
    async (req, res) => {
        check("email", "Не короектный email").normalizeEmail().isEmail();
        check("password", "пароль не должен быть пустып").exists();

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                    },
                });
            }

            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(400).send({
                    error: {
                        message: "EMAIL_NOT_FOUND",
                        code: 400,
                    },
                });
            }

            const isPasswordEqual = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: "INVALID_PASSWORD",
                        code: 400,
                    },
                });
            }

            const tokens = tokenService.generate({ _id: existingUser._id });
            await tokenService.save(existingUser._id, tokens.refreshToken);

            res.status(201).send({ ...tokens, userId: existingUser._id });
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка",
            });
        }
    },
]);

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString();
}
router.post("/token", async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body;
        const data = tokenService.validateRefresh(refreshToken);
        const dbToken = await tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({ message: "Неправильный токен" });
        }

        const tokens = await tokenService.generate({ _id: data._id });
        await tokenService.save(data._id, tokens.refreshToken);

        res.status(200).send({ ...tokens, userId: data._id });
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка",
        });
    }
});

module.exports = router;
