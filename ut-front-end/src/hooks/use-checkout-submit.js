'use client';
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";   
import Cookies from "js-cookie";
import { useCreatePaymentIntentMutation } from "../redux/features/paymentApi";

// internal imports
import useCartInfo from "./use-cart-info";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { set_coupon } from "@/redux/features/coupon/couponSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useSaveOrderMutation } from "@/redux/features/order/orderApi";
import { useGetOfferCouponsQuery } from "@/redux/features/coupon/couponApi";

const useCheckoutSubmit = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Stripe
  const stripe = useStripe();
  const elements = useElements();

  // Cart & total
  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  const [cartTotal, setCartTotal] = useState(total);

  // Payment intent
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  const [clientSecret, setClientSecret] = useState("");

  // Coupon, shipping, discount state
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  // Form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Coupon
  const [couponInfo, setCouponInfo] = useState({});
  const couponRef = useRef("");

  // Update cartTotal whenever total, shippingCost, or discountAmount changes
  useEffect(() => {
    const calculatedTotal = Number(total) + Number(shippingCost) - Number(discountAmount);
    setCartTotal(calculatedTotal);
  }, [total, shippingCost, discountAmount]);


  // Create Stripe PaymentIntent whenever cartTotal changes
  useEffect(() => {
    if (!cartTotal || cart_products.length === 0) return;

    const amount = Math.round(Number(cartTotal) * 100); 

    createPaymentIntent({ amount })
      .unwrap()
      .then((res) => {
        setClientSecret(res.clientSecret);
      })
      .catch((err) => {
        console.error("Payment Intent Error:", err);
      });
  }, [cartTotal, cart_products, createPaymentIntent]);

  //set shipping cost
  const handleShippingCost = (value) => setShippingCost(value);

  return {
    clientSecret,
    createPaymentIntent,
    isLoading,
    cartTotal,
    shippingCost,
    handleShippingCost,
    register,
    handleSubmit,
    errors,
  };
};

export default useCheckoutSubmit;
