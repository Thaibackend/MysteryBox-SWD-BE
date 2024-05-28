const express = require("express");
const PackageOrderController = require("../controllers/packageOrder.controller");
const verify = require("../middlewares/verifyToken");
const router = express.Router();

router.post(
  "/add-order-package/:id",
  verify.verifyToken,
  PackageOrderController.orderPackage
);

router.get(
  "/get-packageorder",
  verify.verifyToken,
  PackageOrderController.getPackageOrderByUserId
);
module.expo;
module.exports = router;
