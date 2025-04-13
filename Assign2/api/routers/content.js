const express = require("express");
const db = require("../db");

const contentRouter = express.Router();

contentRouter.post("/", (req, res) => {
    const { title, description, user_id } = req.body;

    if (!title || !user_id) {
        return res.status(400).json({ message: "Title and user_id are required." });
    }

    db.query(
        "INSERT INTO content (title, description, user_id) VALUES (?, ?, ?)",
        [title, description, user_id],
        (err, result) => {
            if (err) {
                console.error("Error inserting content:", err);
                return res.status(500).json({ message: "Database error" });
            }

            res.status(201).json({
                message: "Content created!",
                contentId: result.insertId
            });
        }
    );
});

module.exports = contentRouter;
