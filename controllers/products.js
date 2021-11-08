const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: products, nbOfHits: products.length });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: error });
  }
};

const createProduct = async (req, res) => {
  try {
    await Product.create(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, msg: "product created successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: error });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: true, data: [], msg: "product not found" });
    }
    return res.status(StatusCodes.OK).json({ success: true, data: product });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.updateOne(
      { _id: id },
      { ...req.body },
      { runValidators: true }
    );

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: true, data: [], msg: "product not found" });
    }
    return res.status(StatusCodes.OK).json({ success: true, data: req.body });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: error });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
};
