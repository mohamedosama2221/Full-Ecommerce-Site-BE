const express = require("express");
const router = express.Router();
const { authMiddleware, authorizedRolesMiddleware } = require("../middlewares");
const {
  getAllUsers,
  getSpecificUser,
} = require("../controllers/adminController");

router.get(
  "/users",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  getAllUsers
);

router.get(
  "/users/:userId",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  getSpecificUser
);

module.exports = router;
