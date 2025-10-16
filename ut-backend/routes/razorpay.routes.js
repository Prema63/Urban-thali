const express = require("express");
const router = express.Router();
const { createOrder, verifyAndSaveOrder } = require("../controllers/razorpayController");

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyAndSaveOrder);

module.exports = router;
