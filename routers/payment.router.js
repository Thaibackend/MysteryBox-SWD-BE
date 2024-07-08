const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.post("/create-payment", paymentController.createPayment);
router.post("/callback", paymentController.callBackPayment);
router.post("/order-status/:app_trans_id", paymentController.orderStatus);
module.exports = router;
