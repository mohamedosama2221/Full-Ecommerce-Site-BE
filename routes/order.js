const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares");
const {
  createOrder,
  getUserOrders,
  getSingleOrders,
} = require("../controllers/orderController");

router.post("/create", authMiddleware, createOrder);
router.get("/me", authMiddleware, getUserOrders);
router.get("/:id", authMiddleware, getSingleOrders);

module.exports = router;
