const express = require("express");
const PeriodController = require("../controllers/period.controller");
const verify = require("../middlewares/verifyToken");
const router = express.Router();

router.get(
  "/set-date/:id",
  verify.verifyToken,
  verify.isStaff,
  PeriodController.setDatePeriod
);

router.post(
  "/create-period",
  verify.verifyToken,
  verify.isStaff,
  PeriodController.createPeriod
);

router.patch(
  "/update-period/:id",
  verify.verifyToken,
  verify.isStaff,
  PeriodController.updatePeriod
);

router.patch(
  "/disable-period/:id",
  verify.verifyToken,
  verify.isStaff,
  PeriodController.disablePeriod
);

module.exports = router;
