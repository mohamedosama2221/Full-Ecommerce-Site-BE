const Order = require("../models/order");
const { StatusCodes } = require("http-status-codes");

const { NotFoundError, BadRequestError } = require("../errors");

const createOrder = async (req, res) => {
  const {
    shippingInfo,
    itemPrice,
    tax,
    shippingPrice,
    totalPrice,
    products,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    itemPrice,
    tax,
    shippingPrice,
    totalPrice,
    products,
    paymentInfo,
    user: req.user._id,
  });

  res.status(StatusCodes.CREATED).json({ success: true, order });
};

const getUserOrders = async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  if (!orders) {
    throw new NotFoundError("there is no orders");
  }

  res.status(StatusCodes.OK).json({ success: true, orders });
};

const getSingleOrders = async (req, res) => {
  const { id: orderID } = req.params;
  const order = await Order.findById(orderID).populate("user", "name email");

  if (!order) {
    throw new NotFoundError("there is no orders");
  }

  res.status(StatusCodes.OK).json({ success: true, order });
};

const getAllOrders = async (req, res) => {
  const { page } = req.query;

  let result = Order.find({});

  const totalOrders = await Order.countDocuments();

  const limit = 10;

  const currentPage = Number(page) || 1;

  result = result.skip(limit * (currentPage - 1)).limit(limit);

  const orders = await result;

  res.status(StatusCodes.OK).json({
    success: true,
    totalOrders,
    page: currentPage,
    nbOfHits: orders.length,
    orders,
  });
};

module.exports = { createOrder, getUserOrders, getSingleOrders, getAllOrders };
