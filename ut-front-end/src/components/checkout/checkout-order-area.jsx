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
import axios from "axios";
import { useForm } from "react-hook-form";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7001";




const CheckoutOrderArea = ({ checkoutData, user }) => {
  const {
    handleShippingCost,
    cartTotal = 0,
    // register,
    // errors,
    shippingCost,
    discountAmount,
    handleCouponCode,
    couponRef,
    couponApplyMsg,
    clearCoupon,
    isCheckoutSubmit,
  } = checkoutData;

  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

  const [checkoutForm, setCheckoutForm] = useState({
    name: user?.name || "",
    address: user?.address || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.city || "",
    country: user?.country || "",
    zipCode: user?.zipCode || "",
    shippingOption: "",
    orderNote: "",
  });

  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();

  const [selectedPayment, setSelectedPayment] = useState("");

  // In CheckoutOrderArea.jsx
  const handlePlaceOrder = async (formData) => {
    const {
      firstName,
      lastName,
      address,
      email,
      contactNo,
      city,
      country,
      zipCode,
      shippingOption,
      orderNote,
    } = formData;

    // Validation
    if (
      !firstName ||
      !lastName ||
      !address ||
      !email ||
      !contactNo ||
      !city ||
      !country ||
      !zipCode
    ) {
      alert("Please fill all required shipping details.");
      return;
    }

    // Build base order payload
    const baseOrderData = {
      user: user._id,
      cart: cart_products,
      name: `${firstName} ${lastName}`,
      address,
      email,
      contact: contactNo,
      city,
      country,
      zipCode,
      subTotal: cartTotal,
      shippingCost: shippingCost || 0,
      discount: discountAmount || 0,
      totalAmount: cartTotal + (shippingCost || 0) - (discountAmount || 0),
      paymentMethod: selectedPayment,
      shippingOption: shippingOption || "",
      orderNote: orderNote || "",
    };

    try {
      if (selectedPayment === "Razorpay") {
        const { data: razorOrder } = await axios.post(
          `${apiUrl}/api/razorpay/create-order`,
          { amount: baseOrderData.totalAmount }
        );

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: razorOrder.amount,
          currency: razorOrder.currency,
          name: "Urban Thali",
          description: `Order #${razorOrder.id}`,
          order_id: razorOrder.id,
          handler: async function (response) {
            const orderData = {
              ...baseOrderData,
              paymentIntent: {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
            };

            try {
              await axios.post(`${apiUrl}/api/order/saveOrder`, orderData);
              alert("✅ Payment successful! Your order has been placed.");
            } catch (saveError) {
              console.error(
                "❌ Failed to save order:",
                saveError.response?.data || saveError
              );
              alert("Payment done, but order save failed. Contact support.");
            }
          },
          prefill: {
            name: `${firstName} ${lastName}`,
            email,
            contact: contactNo,
          },
          notes: {
            cart: JSON.stringify(cart_products),
            shippingCost,
            discount: discountAmount,
            total: baseOrderData.totalAmount,
          },
          theme: { color: "#FCB53B" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else if (selectedPayment === "COD") {
        const orderData = { ...baseOrderData, paymentStatus: "Pending" };
        await axios.post(`${apiUrl}/api/order/saveOrder`, orderData);
        alert("🧾 Order placed successfully with Cash on Delivery!");
      }
    } catch (error) {
      console.error("❌ Order process failed:", error.response?.data || error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <form onSubmit={handleSubmit(handlePlaceOrder)}>
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

        {/* <button
          type="submit"
          onClick={handlePlaceOrder} // Pass form data
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
        </button> */}

        <button
          type="submit"
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
    </form>
  );
};

export default CheckoutOrderArea;
