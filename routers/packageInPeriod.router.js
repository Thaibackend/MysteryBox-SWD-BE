const express = require("express");
const PackageInPeriodController = require("../controllers/packageInPeriod.controller");
const verify = require("../middlewares/verifyToken");
const router = express.Router();

router.post(
  "/create-packageinperiod",
  verify.verifyToken,
  PackageInPeriodController.createPackageInPeriod
);

module.exports = router;
