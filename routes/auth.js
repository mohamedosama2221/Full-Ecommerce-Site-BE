const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares");
const {
  registerUser,
  loginUser,
  logOut,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/user", authMiddleware, getCurrentUser);
router.patch("/user/update/:userId", authMiddleware, updateCurrentUser);
module.exports = router;
