const errorHandlerMiddleware = require("./error-handler");
const notFoundMiddleware = require("./route-not-found");

module.exports = {
  errorHandlerMiddleware,
  notFoundMiddleware,
};
