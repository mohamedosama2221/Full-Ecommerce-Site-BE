const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllProducts = async (req, res) => {
  const {
    name,
    page,
    color,
    featured,
    freeShipping,
    discount,
    reviewaverage,
    category,
    company,
    minPrice,
    maxPrice,
    select,
    sort,
  } = req.query;

  let queryObj = {};

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (featured) {
    queryObj.featured = featured;
  }

  if (freeShipping) {
    queryObj.freeShipping = freeShipping;
  }

  if (discount) {
    queryObj.discount = discount;
  }

  if (reviewaverage) {
    queryObj.reviewAverage = { $gte: Number(reviewaverage) };
  }

  if (color) {
    queryObj.colors = color;
  }

  if (company) {
    queryObj.company = company;
  }

  if (category) {
    queryObj.category = category;
  }

  if (minPrice && maxPrice) {
    queryObj.price = { $lte: maxPrice, $gte: minPrice };
  }

  if (sort) {
    queryObj.sort = sort.split(",").join(" ");
  }

  if (select) {
    queryObj.select = select.split(",").join(" ");
  }

  const result = Product.find(queryObj);

  const limit = 10;

  const pageNumber = Number(page) || 1;

  result
    .skip(limit * (pageNumber - 1))
    .limit(limit)
    .sort(queryObj.sort)
    .select(queryObj.select);

  const products = await result;

  const productsCount = await Product.countDocuments();

  return res.status(StatusCodes.OK).json({
    success: true,
    page: pageNumber,
    nbOfHits: products.length,
    data: products,
    productsCount,
  });
};

const createProduct = async (req, res) => {
  await Product.create(req.body);

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
