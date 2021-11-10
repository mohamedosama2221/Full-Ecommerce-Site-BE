const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const { NotFoundError } = require("../errors");

const getAllUsers = async (req, res) => {
  const { page } = req.query;

  let result = User.find({}).select("-password");

  const currentPage = Number(page) || 1;

  const limit = 20;

  result = result.skip(limit * (currentPage - 1)).limit(limit);

  const users = await result;

  const totalNumberOfUsers = await User.countDocuments();

  res.status(StatusCodes.OK).json({
    success: true,
    currentPage,
    nbOfHits: users.length,
    totalNumberOfUsers,
    users,
  });
};

const getSpecificUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new NotFoundError(`there is no user with id ${userId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
};

module.exports = { getAllUsers, getSpecificUser };
