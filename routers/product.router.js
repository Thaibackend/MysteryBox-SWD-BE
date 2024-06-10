const express = require("express");
const ProductController = require("../controllers/product.controller");
const router = express.Router();

router.post("/create-product", ProductController.createProduct);
router.post("/random-product", ProductController.randomProduct);
router.get("/get-product", ProductController.getProducts);
router.get("/get-productById/:id", ProductController.getProductById);
router.delete("/delete-productById/:id", ProductController.deleteProduct);

module.exports = router;
