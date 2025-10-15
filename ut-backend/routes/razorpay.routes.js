const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../api/razorpay");

// Create Order
router.post("/create-order", createOrder);

// Verify Payment
router.post("/verify-payment", verifyPayment);

module.exports = router;
