const express = require("express");
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment.js");
const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(auth, async (req, res) => {
        try {
            const { orederBy, equalTo } = req.query;
            const list = await Comment.find({ [orederBy]: equalTo });
            res.send(list);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка",
            });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newComment = await Comment.create({
                ...req.body,
                useId: req.user._id,
            });
            res.status(201).send(newComment);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка",
            });
        }
    });

router.delete("/:commentId", auth, async (req, res) => {
    try {
        const { commentId } = req.params;
        const removedComment = await Comment.findById(commentId);
        if (removedComment.userId.toString() === req.user._id) {
            await removedComment.remove();
            return res.send(null);
        } else {
            return res.status(401).json({
                message: "У вас нет прав для удаления комментария",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "На сервере произошла ошибка",
        });
    }
});

module.exports = router;
