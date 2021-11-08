const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getSingleProduct,
} = require("../controllers/products");

router.get("/", getAllProducts);
router.post("/create", createProduct);
router.get("/:id", getSingleProduct);

module.exports = router;
