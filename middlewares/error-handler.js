const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  const errorObject = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "something went wrong please try again",
  };

  return res
    .status(errorObject.statusCode)
    .json({ success: false, msg: errorObject.message });
};

module.exports = errorHandler;
