const express = require("express");
const router = express.Router();
const { authMiddleware, authorizedRolesMiddleware } = require("../middlewares");
const {
  getAllUsers,
  getSpecificUser,
  updateUser,
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

router.patch(
  "/users/update/:userId",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  updateUser
);

module.exports = router;
