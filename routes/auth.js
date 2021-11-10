const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares");
const {
  registerUser,
  loginUser,
  logOut,
  getCurrentUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/me", authMiddleware, getCurrentUser);
module.exports = router;
