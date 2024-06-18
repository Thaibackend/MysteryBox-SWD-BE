const express = require("express");
const PeriodController = require("../controllers/period.controller");
const verify = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/get-current-period", PeriodController.getCurrentPeriod);
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

router.get(
  "/set-period/:id",
  verify.verifyToken,
  verify.isStaff,
  PeriodController.setPeriod
);

router.patch(
  "/disable-period/:id",
  verify.verifyToken,
  verify.isStaff,
  PeriodController.disablePeriod
);

module.exports = router;
