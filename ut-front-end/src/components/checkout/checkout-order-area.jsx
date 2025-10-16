"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";
import CheckoutCoupon from "./checkout-coupon";

const CheckoutOrderArea = ({ checkoutData }) => {
  const {
    handleShippingCost, 
    cartTotal = 0,
    // stripe,
    isCheckoutSubmit,
    // clientSecret,
    register,
    errors,
    showCard,
    setShowCard,
    shippingCost,
    discountAmount,
    handleCouponCode,
    couponRef,
    couponApplyMsg,
    clearCoupon,
  } = checkoutData;

  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  const [loader, setloader] = useState(false)

// razorpay
  const handleRazorpayPayment = async () => {
  try {
    console.log("🟡 Creating Razorpay order...");
    const orderRes = await fetch("http://localhost:7001/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: orderData.totalAmount }),
    });

    const order = await orderRes.json();
    console.log("🔵 Order Response:", order);

    if (!order.id) {
      console.error("❌ Failed to create Razorpay order:", order);
      alert("Failed to create Razorpay order");
      return;
    }

    // Load Razorpay script (if not already loaded)
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please refresh the page.");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Your Store Name",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response) {
        console.log("✅ Razorpay Response:", response);
        const verifyRes = await fetch("http://localhost:7001/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            ...orderData,
          }),
        });
        const verifyData = await verifyRes.json();
        console.log("🟢 Verify Response:", verifyData);

        if (verifyData.success) {
          alert("✅ Payment successful & order stored!");
          window.location.href = "/order-success";
        } else {
          alert("❌ Payment verification failed");
        }
      },
      prefill: {
        name: orderData.name,
        email: orderData.email,
        contact: orderData.contact,
      },
      theme: { color: "#3399cc" },
    };

    console.log("🟢 Opening Razorpay Checkout...");
    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error("🔥 Razorpay Payment Error:", error);
    alert("Something went wrong during payment");
  }
};


  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      {/* Coupon Section - Inside Your Order */}
      <div
        className="tp-checkout-coupon-section"
        style={{
          marginBottom: "20px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <CheckoutCoupon
          handleCouponCode={handleCouponCode}
          couponRef={couponRef}
          couponApplyMsg={couponApplyMsg}
          clearCoupon={clearCoupon}
        />
      </div>

      <div className="tp-order-info-list">
        <ul>
          {/*  header */}
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>

          {/*  item list */}
          {cart_products?.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.title} <span> x {item.orderQuantity}</span>
              </p>
              <span>₹{item.price.toFixed(2)}</span>
            </li>
          ))}
          {/*  subtotal */}
          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </li>

          {/*  shipping cost */}
          <li className="tp-order-info-list-subtotal">
            <span>Shipping Cost</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </li>

          {/* discount */}
          <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            {/* <span>₹{discountAmount.toFixed(2)}</span> */}
          </li>

          {/* total */}
          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>₹{parseFloat(cartTotal).toFixed(2)}</span>
          </li>
        </ul>
      </div>

      {/* payment section*/}
      <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            type="radio"
            id="back_transfer"
            name="payment"
            value="Card"
          />

          {/* {showCard && (
            <div className="direct-bank-transfer">
              <div className="payment_card">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )} */}
          <ErrorMsg msg={errors?.payment?.message} />
        </div>  


        {/* Razorpay setup */}
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            type="radio"
            id="razorpay"
            name="payment"
            value="Razorpay"
          />
          <label htmlFor="razorpay">Razorpay.. (Cards, UPI, Net Banking)</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>


        {/* COD setup */}
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            type="radio"
            id="cod"
            name="payment"
            value="COD"
          />
          <label htmlFor="cod">Cash on Delivery</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>

        
      </div>

      {/* place order button */}
      <button
       onClick={handleRazorpayPayment}
        type="submit"
        disabled={(showCard && !stripe) || isCheckoutSubmit}
        className="tp-checkout-btn w-100"
        style={{
          backgroundColor:
            (showCard && !stripe) || isCheckoutSubmit ? "#6b7280" : "#FCB53B",
          cursor:
            (showCard && !stripe) || isCheckoutSubmit
              ? "not-allowed"
              : "pointer",
          opacity: (showCard && !stripe) || isCheckoutSubmit ? 0.6 : 1,
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          textAlign: "center",
        }}
      >
        Place Order
      </button>

     
    </div>
  );
};

export default CheckoutOrderArea;