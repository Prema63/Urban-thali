'use client';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
// internal
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutLogin from "./checkout-login";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";

const CheckoutArea = () => {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticate = Cookies.get("userInfo");
    if(!isAuthenticate){
      router.push("/login")
    }
  },[router]);
  const checkoutData = useCheckoutSubmit();
  const {handleSubmit,submitHandler,register,errors} = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);
  return (
    <>
      <section
        className="tp-checkout-area pb-120"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container">
          {cart_products.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">No items found in cart to checkout</h3>
              <Link 
                href="/shop" 
                className="tp-checkout-btn"
                style={{
                  backgroundColor: '#FCB53B',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  textAlign: 'center',
                  display: 'inline-block',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#B45253';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#FCB53B';
                }}
              >
                Return to shop
              </Link>
            </div>
          )}
          {cart_products.length > 0 && (
            <div className="row">
              <div className="col-xl-7 col-lg-7">
                <div className="tp-checkout-verify">
                  <CheckoutLogin />
                </div>
              </div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="row">
                  <div className="col-lg-7">
                    <CheckoutBillingArea register={register} errors={errors} />
                  </div>
                  <div className="col-lg-5">
                    <CheckoutOrderArea checkoutData={checkoutData} />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
