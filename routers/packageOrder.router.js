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
  "/get-packageorderbyuserid",
  verify.verifyToken,
  PackageOrderController.getPackageOrderByUserId
);

router.get(
  "/get-packageorderbyidpk/:id",
  verify.verifyToken,
  PackageOrderController.getPackageOrderByIdPk
);

router.patch(
  "/push-packageinperiod/:id",
  verify.verifyToken,
  PackageOrderController.pushPackageInPeriod
);
module.expo;
module.exports = router;
