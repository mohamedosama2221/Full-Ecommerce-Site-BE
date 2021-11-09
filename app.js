//chalk
const chalk = require("chalk");

//env
require("dotenv").config();

//errors handling
require("express-async-errors");

//express
const express = require("express");
const app = express();

//DB
const connectDB = require("./db/connection");

//custom middleware imports
const { notFoundMiddleware, errorHandlerMiddleware } = require("./middlewares");

//build in middleware
app.use(express.json());

//port
const port = process.env.PORT || 3000;

//routes
// const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

// app.use("/api/v1/products", productRoutes);
app.use("/api/v1/", authRoutes);

//custom middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
