const express = require("express");

const router = express.Router();

const { getAllProducts, getSingleProduct } = require("../controllers/products");

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

module.exports = router;
