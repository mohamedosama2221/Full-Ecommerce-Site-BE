const CustomError = require("./customError");
const { StatusCodes } = require("http-status-codes");

class UnAuthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnAuthorizedError;
