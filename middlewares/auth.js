const { UnAuthenticatedError } = require("../errors");
const verifyToken = require("../utils/verifyToken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnAuthenticatedError(
      "you are not authenticated to access this page"
    );
  }

  try {
    const { userId } = verifyToken(token);

    const user = await User.findOne({ _id: userId });

    req.user = user;

    next();
  } catch (error) {
    throw new UnAuthenticatedError("authentication failed , token is invalid");
  }
};
module.exports = authMiddleware;
