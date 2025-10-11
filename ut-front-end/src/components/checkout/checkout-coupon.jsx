"use client";
import { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutCoupon = ({
  handleCouponCode,
  couponRef,
  couponApplyMsg,
  clearCoupon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { coupon_info } = useSelector((state) => state.coupon);

  return (
    <div className="tp-checkout-coupon-wrapper">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "600",
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🎟️ Have a coupon?
        </h4>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="tp-checkout-coupon-form-reveal-btn"
          style={{
            backgroundColor: isOpen ? "#e6a03a" : "#FCB53B",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e6a03a";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = isOpen ? "#e6a03a" : "#FCB53B";
          }}
        >
          {isOpen ? "Hide Coupon" : "Apply Coupon"}
        </button>
      </div>

      {isOpen && (
        <div id="tpCheckoutCouponForm" className="tp-checkout-coupon-form">
          <form
            onSubmit={(e) => {
              // console.log("Form submitted!");
              // e.preventDefault();
              if (typeof handleCouponCode === "function") {
                handleCouponCode(e);
              }
            }}
            style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
          >
            <div className="tp-checkout-coupon-input" style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Coupon Code:
              </label>
              <input
                ref={couponRef}
                type="text"
                placeholder="Enter coupon code"
                // onChange={(e) => {
                //   console.log("Input changed:", e.target.value);
                // }}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#FCB53B";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ddd";
                }}
              />
            </div>
            <button
              type="submit"
              className="tp-checkout-coupon-btn"
              // onClick={(e) => {
              //   console.log("Apply button clicked!");
              //   e.preventDefault();
              //   handleCouponCode(e);
              // }}
              style={{
                backgroundColor: "#FCB53B",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                height: "fit-content",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#e6a03a";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#FCB53B";
              }}
            >
              Apply
            </button>
            {coupon_info && (
              <button
                type="button"
                // onClick={clearCoupon}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  height: "fit-content",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#c82333";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#dc3545";
                }}
              >
                Clear
              </button>
            )}
          </form>
          {couponApplyMsg && (
            <p
              style={{
                color: "#28a745",
                fontSize: "13px",
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#d4edda",
                border: "1px solid #c3e6cb",
                borderRadius: "4px",
              }}
            >
              {couponApplyMsg}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutCoupon;
