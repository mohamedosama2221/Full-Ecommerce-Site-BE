const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { sendToken } = require("../utils/jwtToken");

const {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
} = require("../errors");

const registerUser = async (req, res) => {
  const user = await User.create(req.body);

  sendToken(user, StatusCodes.CREATED, res, "User created successfully");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please enter both email and password");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new UnAuthenticatedError("this email doesn't exist");
  }

  const isMatch = await user.comparePasswords(password);

  if (!isMatch) {
    throw new UnAuthenticatedError("this password isn't correct");
  }

  sendToken(user, StatusCodes.OK, res, "User login successfully");
};

const getCurrentUser = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findOne({ _id: userId }).select("-password");
  res.status(StatusCodes.OK).json({ user });
};

const updateCurrentUser = async (req, res) => {
  const { _id: userId } = req.user;

  if (req.user.rule === "user") req.body.rule = "user";

  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    runValidators: true,
    new: true,
    useFindAndModify: false,
  }).select("-password");

  if (!user) {
    throw new NotFoundError(`there is no user with id ${userId}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

const logOut = async (req, res) => {
  req.user = null;
  res
    .status(StatusCodes.OK)
    .clearCookie("token")
    .json({ success: true, msg: "User logout successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  logOut,
  getCurrentUser,
  updateCurrentUser,
};
