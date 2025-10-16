const express = require("express");
const router = express.Router();
const { createOrder, verifyAndSaveOrder } = require("../api/razorpay");

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyAndSaveOrder);

module.exports = router;
