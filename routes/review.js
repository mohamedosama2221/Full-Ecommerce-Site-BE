const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middlewares");

const {
  addReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/add", authMiddleware, addReview);
router.get("/getAllReviews", authMiddleware, getProductReviews);
router.delete("/deleteReview", authMiddleware, deleteReview);

module.exports = router;
