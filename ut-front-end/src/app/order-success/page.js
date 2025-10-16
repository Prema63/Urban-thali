'use client';
import Link from "next/link";

const OrderSuccessPage = () => {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>✅ Thank you! Your order has been placed.</h1>
      <p>You will receive a confirmation email shortly.</p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#FCB53B",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
