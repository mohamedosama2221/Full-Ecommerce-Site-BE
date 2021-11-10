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

const updateUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    runValidators: true,
    new: true,
    useFindAndModify: false,
  }).select("-password");

  if (!user) {
    throw new NotFoundError(`there is no user with id ${userId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOneAndDelete({ _id: userId });

  if (!user) {
    throw new NotFoundError(`there is no user with id ${userId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    msg: `user with id ${userId} was successfully deleted`,
  });
};

module.exports = { getAllUsers, getSpecificUser, updateUser, deleteUser };
