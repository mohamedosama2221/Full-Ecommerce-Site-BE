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

module.exports = { createOrder };
