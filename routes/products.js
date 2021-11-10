const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

router.get("/", getAllProducts);
router.post("/create", createProduct);
router.get("/:id", getSingleProduct);
router.patch("/admin/:id", updateProduct);
router.delete("/admin/:id", deleteProduct);

module.exports = router;
