const errorHandlerMiddleware = require("./error-handler");
const notFoundMiddleware = require("./route-not-found");
const authMiddleware = require("./auth");

module.exports = {
  errorHandlerMiddleware,
  notFoundMiddleware,
  authMiddleware,
};
