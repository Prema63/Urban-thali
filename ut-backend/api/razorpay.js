const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    console.log("🟢 Received create-order request:", req.body);
    const { amount } = req.body;

    if (!amount) {
      console.log("❌ No amount received");
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Razorpay order created:", order);

    return res.status(200).json(order);
  } catch (error) {
    console.error("🔥 Razorpay Create Order Error:", error);
    return res.status(500).json({ error: error.message });
  }
};



//  Verify Payment  and Store Order 

const verifyAndSaveOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user,
      cart,
      name,
      address,
      email,
      contact,
      city,
      country,
      zipCode,
      subTotal,
      shippingCost,
      discount,
      totalAmount,
      shippingOption,
      orderNote,
      restaurant,
    } = req.body;

    // Check required Razorpay fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // 🔒 Verify Razorpay Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // ✅ If signature is valid, save order in MongoDB
    const orderData = {
      user,
      cart,
      name,
      address,
      email,
      contact,
      city,
      country,
      zipCode,
      subTotal,
      shippingCost,
      discount,
      totalAmount,
      shippingOption,
      orderNote,
      restaurant,
      paymentMethod: "Razorpay",
      paymentIntent: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
      status: "confirmed",
    };

    const newOrder = await Order.create(orderData);

    console.log("✅ Order stored successfully:", newOrder._id);

    res.status(200).json({
      success: true,
      message: "Payment verified and order stored successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("❌ Verify & Save Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, verifyAndSaveOrder };
