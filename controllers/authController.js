const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { sendToken } = require("../utils/jwtToken");

const { BadRequestError, UnAuthenticatedError } = require("../errors");

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

module.exports = {
  registerUser,
  loginUser,
};
