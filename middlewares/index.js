const errorHandlerMiddleware = require("./error-handler");
const notFoundMiddleware = require("./route-not-found");
const { authMiddleware, authorizedRolesMiddleware } = require("./auth");

module.exports = {
  errorHandlerMiddleware,
  notFoundMiddleware,
  authMiddleware,
  authorizedRolesMiddleware,
};
