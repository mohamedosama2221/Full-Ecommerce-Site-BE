const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  if (!products.length) {
    throw new NotFoundError("No products found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ success: true, data: products, nbOfHits: products.length });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, msg: "product created successfully" });
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new NotFoundError("No product found");
  }
  return res.status(StatusCodes.OK).json({ success: true, data: product });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    runValidators: true,
    useFindAndModify: false,
    new: true,
  });

  if (!product) {
    throw new NotFoundError("No product found");
  }
  return res.status(StatusCodes.OK).json({ success: true, data: product });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    throw new NotFoundError("No product found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "product is successfully deleted" });
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
