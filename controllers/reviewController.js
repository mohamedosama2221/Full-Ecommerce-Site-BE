const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const addReview = async (req, res) => {
  const { comment, rating, productID } = req.body;

  if (!comment || !rating) {
    throw new BadRequestError("please provide a rating and a review");
  }

  if (!productID) {
    throw new BadRequestError("please provide a valid product ID");
  }

  const product = await Product.findOne({ _id: productID });

  const review = {
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.rating = Number(rating);
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
  }
  product.reviewAverage =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: true });

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, msg: "Thank you for submitting a review", product });
};

module.exports = { addReview };
