module.exports.sendToken = (user, statusCode, res, msg) => {
  const token = user.createJWT();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000 * 24
    ),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, msg: msg, token });
};
