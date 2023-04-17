const express = require("express");
const router = express.Router({ mergeParams: true });
const Profession = require("../models/Profession");

router.get("/", async (req, res) => {
    try {
        const list = await Profession.find();
        res.status(200).send(list);
    } catch (err) {
        res.status(500).jsoon({
            message: "На сервере произошла ошибка",
        });
    }
});

module.exports = router;
