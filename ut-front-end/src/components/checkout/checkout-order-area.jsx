// "use client";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import useCartInfo from "@/hooks/use-cart-info";
// import ErrorMsg from "../common/error-msg";
// import CheckoutCoupon from "./checkout-coupon";

// const CheckoutOrderArea = ({ checkoutData }) => {
//   const {
//     handleShippingCost,
//     cartTotal = 0,
//     // stripe,
//     isCheckoutSubmit,
//     // clientSecret,
//     register,
//     errors,
//     showCard,
//     setShowCard,
//     shippingCost,
//     discountAmount,
//     handleCouponCode,
//     couponRef,
//     couponApplyMsg,
//     clearCoupon,
//   } = checkoutData;
//   const { cart_products } = useSelector((state) => state.cart);
//   const { total } = useCartInfo();
//   return (
//     <div className="tp-checkout-place white-bg">
//       <h3 className="tp-checkout-place-title">Your Order</h3>

//       {/* Coupon Section - Inside Your Order */}
//       <div
//         className="tp-checkout-coupon-section"
//         style={{
//           marginBottom: "20px",
//           padding: "20px",
//           backgroundColor: "#f8f9fa",
//           borderRadius: "8px",
//           border: "1px solid #e9ecef",
//           boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//         }}
//       >
//         <CheckoutCoupon
//           handleCouponCode={handleCouponCode}
//           couponRef={couponRef}
//           couponApplyMsg={couponApplyMsg}
//           clearCoupon={clearCoupon}
//         />
//       </div>

//       <div className="tp-order-info-list">
//         <ul>
//           {/*  header */}
//           <li className="tp-order-info-list-header">
//             <h4>Product</h4>
//             <h4>Total</h4>
//           </li>

//           {/*  item list */}
//           {cart_products?.map((item) => (
//             <li key={item._id} className="tp-order-info-list-desc">
//               <p>
//                 {item.title} <span> x {item.orderQuantity}</span>
//               </p>
//               <span>₹{item.price.toFixed(2)}</span>
//             </li>
//           ))}
//           {/*  subtotal */}
//           <li className="tp-order-info-list-subtotal">
//             <span>Subtotal</span>
//             <span>₹{total.toFixed(2)}</span>
//           </li>

//           {/*  shipping cost */}
//           <li className="tp-order-info-list-subtotal">
//             <span>Shipping Cost</span>
//             <span>₹{shippingCost.toFixed(2)}</span>
//           </li>

//           {/* discount */}
//           <li className="tp-order-info-list-subtotal">
//             <span>Discount</span>
//             {/* <span>₹{discountAmount.toFixed(2)}</span> */}
//           </li>

//           {/* total */}
//           <li className="tp-order-info-list-total">
//             <span>Total</span>
//             <span>₹{parseFloat(cartTotal).toFixed(2)}</span>
//           </li>
//         </ul>
//       </div>
//       <div className="tp-checkout-payment">
//         {/* <div className="tp-checkout-payment-item">
//           <input
//             {...register(`payment`, {
//               required: `Payment Option is required!`,
//             })}
//             type="radio"
//             id="back_transfer"
//             name="payment"
//             value="Card"
//           />

//           {showCard && (
//             <div className="direct-bank-transfer">
//               <div className="payment_card">
//                 <CardElement
//                   options={{
//                     style: {
//                       base: {
//                         fontSize: "16px",
//                         color: "#424770",
//                         "::placeholder": {
//                           color: "#aab7c4",
//                         },
//                       },
//                       invalid: {
//                         color: "#9e2146",
//                       },
//                     },
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//           <ErrorMsg msg={errors?.payment?.message} />
//         </div> */}

//         {/* Razorpay option temporarily hidden */}
//         <div className="tp-checkout-payment-item">
//           <input
//             {...register(`payment`, {
//               required: `Payment Option is required!`,
//             })}
//             onClick={() => setShowCard(false)}
//             type="radio"
//             id="razorpay"
//             name="payment"
//             value="Razorpay"
//           />
//           <label htmlFor="razorpay">Razorpay (Cards, UPI, Net Banking)</label>
//           <ErrorMsg msg={errors?.payment?.message} />
//         </div>

//         <div className="tp-checkout-payment-item">
//           <input
//             {...register(`payment`, {
//               required: `Payment Option is required!`,
//             })}
//             onClick={() => setShowCard(false)}
//             type="radio"
//             id="cod"
//             name="payment"
//             value="COD"
//           />
//           <label htmlFor="cod">Cash on Delivery</label>
//           <ErrorMsg msg={errors?.payment?.message} />
//         </div>
//       </div>

//       {/* place order button */}
//       {/* <button
//         type="submit"
//         disabled={(showCard && !stripe) || isCheckoutSubmit}
//         className="tp-checkout-btn w-100"
//         style={{
//           backgroundColor:
//             (showCard && !stripe) || isCheckoutSubmit ? "#6b7280" : "#FCB53B",
//           cursor:
//             (showCard && !stripe) || isCheckoutSubmit
//               ? "not-allowed"
//               : "pointer",
//           opacity: (showCard && !stripe) || isCheckoutSubmit ? 0.6 : 1,
//           color: "white",
//           border: "none",
//           padding: "12px 24px",
//           borderRadius: "6px",
//           fontSize: "16px",
//           fontWeight: "600",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           width: "100%",
//           textAlign: "center",
//         }}
//       >
//         Place Order
//       </button> */}

//       <button
//         type="submit"
//         disabled={isCheckoutSubmit}
//         className="tp-checkout-btn w-100"
//         style={{
//           backgroundColor: isCheckoutSubmit ? "#6b7280" : "#FCB53B",
//           cursor: isCheckoutSubmit ? "not-allowed" : "pointer",
//           opacity: isCheckoutSubmit ? 0.6 : 1,
//           color: "white",
//           border: "none",
//           padding: "12px 24px",
//           borderRadius: "6px",
//           fontSize: "16px",
//           fontWeight: "600",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           width: "100%",
//           textAlign: "center",
//         }}
//       >
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default CheckoutOrderArea;

"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";
import CheckoutCoupon from "./checkout-coupon";

const CheckoutOrderArea = ({ checkoutData, user }) => {
  const {
    handleShippingCost,
    cartTotal = 0,
    register,
    errors,
    shippingCost,
    discountAmount,
    handleCouponCode,
    couponRef,
    couponApplyMsg,
    clearCoupon,
    isCheckoutSubmit,
  } = checkoutData;

  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();

  const [selectedPayment, setSelectedPayment] = useState("");

  // const handlePlaceOrder = async (e) => {
  //   e.preventDefault();
  //   if (!selectedPayment) return;

  //   if (selectedPayment === "Razorpay") {
  //     try {
  //       // Call your backend API to create Razorpay order
  //       const res = await fetch("/api/razorpay", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ amount: cartTotal }),
  //       });
  //       const order = await res.json();

  //       const options = {
  //         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  //         amount: order.amount,
  //         currency: order.currency,
  //         name: "Urban Thali",
  //         description: `Order #${order.id}`,
  //         order_id: order.id,
  //         handler: function (response) {
  //           // Handle success
  //           console.log("Payment successful:", response);

  //           // TODO: save payment info to DB along with cart_products and user info
  //         },
  //         prefill: {
  //           name: user?.name || "",
  //           email: user?.email || "",
  //           contact: user?.phone || "",
  //         },
  //         notes: {
  //           cart: JSON.stringify(cart_products),
  //           shippingCost: shippingCost,
  //           discount: discountAmount,
  //           total: cartTotal,
  //         },
  //         theme: { color: "#FCB53B" },
  //       };

  //       const rzp = new window.Razorpay(options);
  //       rzp.open();
  //     } catch (error) {
  //       console.error("Razorpay order creation failed:", error);
  //     }
  //   }

  //   if (selectedPayment === "COD") {
  //     // Dynamic COD order handling
  //     const orderData = {
  //       user,
  //       cart: cart_products,
  //       total: cartTotal,
  //       shippingCost,
  //       discountAmount,
  //       paymentMethod: "COD",
  //     };
  //     console.log("COD order placed:", orderData);
  //     alert("Order placed with Cash on Delivery!");
  //     // TODO: save COD order to DB
  //   }
  // };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!selectedPayment) {
      alert("Please select a payment option!");
      return;
    }

    // ---------------- RAZORPAY ----------------
    if (selectedPayment === "Razorpay") {
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please check your script.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay key
        amount: Math.round(cartTotal * 100), // amount in paise
        currency: "INR",
        name: "Urban Thali",
        description: `Order Payment - ${new Date().toLocaleString()}`,
        handler: function (response) {
          console.log("Payment successful:", response);

          // TODO: Save payment info + order details to DB
          alert("Payment Successful!");
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        notes: {
          cart: JSON.stringify(cart_products),
          shippingCost: shippingCost,
          discount: discountAmount,
          total: cartTotal,
        },
        theme: { color: "#FCB53B" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }

    // ---------------- CASH ON DELIVERY ----------------
    if (selectedPayment === "COD") {
      const orderData = {
        user,
        cart: cart_products,
        total: cartTotal,
        shippingCost,
        discountAmount,
        paymentMethod: "COD",
        date: new Date(),
      };

      console.log("COD order placed:", orderData);
      alert("Order placed with Cash on Delivery!");

      // TODO: Save orderData to your database
    }
  };

  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Your Order</h3>

      {/* Coupon Section */}
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
          <li className="tp-order-info-list-header">
            <h4>Product</h4>
            <h4>Total</h4>
          </li>

          {cart_products?.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.title} <span> x {item.orderQuantity}</span>
              </p>
              <span>₹{item.price.toFixed(2)}</span>
            </li>
          ))}

          <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </li>

          <li className="tp-order-info-list-subtotal">
            <span>Shipping Cost</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </li>

          <li className="tp-order-info-list-subtotal">
            <span>Discount</span>
            <span>₹{discountAmount?.toFixed(2) || 0}</span>
          </li>

          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>₹{parseFloat(cartTotal).toFixed(2)}</span>
          </li>
        </ul>
      </div>

      <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register("payment", {
              required: "Payment Option is required!",
            })}
            type="radio"
            id="razorpay"
            name="payment"
            value="Razorpay"
            onChange={() => setSelectedPayment("Razorpay")}
          />
          <label htmlFor="razorpay">Razorpay (Cards, UPI, Net Banking)</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>

        <div className="tp-checkout-payment-item">
          <input
            {...register("payment", {
              required: "Payment Option is required!",
            })}
            type="radio"
            id="cod"
            name="payment"
            value="COD"
            onChange={() => setSelectedPayment("COD")}
          />
          <label htmlFor="cod">Cash on Delivery</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div>

      <button
        type="submit"
        onClick={handlePlaceOrder}
        disabled={isCheckoutSubmit || !selectedPayment}
        className="tp-checkout-btn w-100"
        style={{
          backgroundColor:
            isCheckoutSubmit || !selectedPayment ? "#6b7280" : "#FCB53B",
          cursor:
            isCheckoutSubmit || !selectedPayment ? "not-allowed" : "pointer",
          opacity: isCheckoutSubmit || !selectedPayment ? 0.6 : 1,
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
