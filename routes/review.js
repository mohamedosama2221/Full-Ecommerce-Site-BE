const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middlewares");

const { addReview } = require("../controllers/reviewController");

router.post("/add", authMiddleware, addReview);

module.exports = router;
