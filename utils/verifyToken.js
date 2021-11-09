const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  const tokenVerification = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return tokenVerification;
};

module.exports = verifyToken;
