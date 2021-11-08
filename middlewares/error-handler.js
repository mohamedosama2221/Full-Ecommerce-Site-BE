const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const errorObject = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "something went wrong please try again",
  };
  if (err.name === "ValidationError") {
    errorObject.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    errorObject.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    errorObject.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    errorObject.statusCode = 400;
  }
  if (err.name === "CastError") {
    errorObject.message = `No item found with id : ${err.value}`;
    errorObject.statusCode = 404;
  }
  return res
    .status(errorObject.statusCode)
    .json({ success: false, msg: errorObject.message });
};

module.exports = errorHandlerMiddleware;
