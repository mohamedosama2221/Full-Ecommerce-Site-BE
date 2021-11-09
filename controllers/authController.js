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

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "User login successfully", token });
};

module.exports = {
  registerUser,
  loginUser,
};
