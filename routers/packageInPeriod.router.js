const express = require("express");
const PackageInPeriodController = require("../controllers/packageInPeriod.controller");
const verify = require("../middlewares/verifyToken");
const router = express.Router();

router.post(
  "/create-packageinperiod",
  verify.verifyToken,
  PackageInPeriodController.createPackageInPeriod
);

router.get(
  "/get-packageinperiod-by-packageOrder/:id",
  verify.verifyToken,
  PackageInPeriodController.getPackageInPeriodByPackageOrder
);

router.get(
  "/get-all-packageinperiod",
  verify.verifyToken,
  PackageInPeriodController.getAllPackageInPeriod
);

module.exports = router;
