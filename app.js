//chalk
const chalk = require("chalk");

//env
require("dotenv").config();

//express
const express = require("express");
const app = express();

//DB
const connectDB = require("./db/connection");

//port
const port = process.env.PORT || 3000;

//routes
const productRoutes = require("./routes/products");

app.use("/api/v1/", productRoutes);
//starting server

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port);
    console.log(chalk.bgBlue("connected"));
  } catch (error) {
    throw new Error(error.message);
  }
};

start();
