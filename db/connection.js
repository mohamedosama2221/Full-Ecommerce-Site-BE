const mongoose = require("mongoose");

const connectDB = async (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
  });
};

module.exports = connectDB;
