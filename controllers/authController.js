const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
  UnAuthenticatedError,
} = require("../errors");

const registerUser = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, msg: "User created successfully", token });
};

module.exports = {
  registerUser,
};
