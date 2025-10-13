// 'use client';
// import dayjs from "dayjs";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";   
// import Cookies from "js-cookie";
// import { useCreatePaymentIntentMutation } from "@/redux/features/paymentApi";


// // internal imports
// import useCartInfo from "./use-cart-info";
// import { set_shipping } from "@/redux/features/order/orderSlice";
// import { set_coupon } from "@/redux/features/coupon/couponSlice";
// import { notifyError, notifySuccess } from "@/utils/toast";
// import { useSaveOrderMutation } from "@/redux/features/order/orderApi";
// import { useGetOfferCouponsQuery } from "@/redux/features/coupon/couponApi";

// const useCheckoutSubmit = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   // Stripe
//   const stripe = useStripe();
//   const elements = useElements();

//   // Cart & total
//   const { cart_products } = useSelector((state) => state.cart);
//   const { total } = useCartInfo();
//   const [cartTotal, setCartTotal] = useState(total);

//   // Payment intent
//   const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
//   const [clientSecret, setClientSecret] = useState("");

//   // Coupon, shipping, discount state
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [shippingCost, setShippingCost] = useState(0);

//   // Form
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm();

//   // Coupon
//   const [couponInfo, setCouponInfo] = useState({});
//   const couponRef = useRef("");

//   // Update cartTotal whenever total, shippingCost, or discountAmount changes
//   useEffect(() => {
//     const calculatedTotal = Number(total) + Number(shippingCost) - Number(discountAmount);
//     setCartTotal(calculatedTotal);
//   }, [total, shippingCost, discountAmount]);


//   // Create Stripe PaymentIntent whenever cartTotal changes
//   useEffect(() => {
//     if (!cartTotal || cart_products.length === 0) return;

//     const amount = Math.round(Number(cartTotal) * 100); 

//     createPaymentIntent({ amount })
//       .unwrap()
//       .then((res) => {
//         setClientSecret(res.clientSecret);
//       })
//       .catch((err) => {
//         console.error("Payment Intent Error:", err);
//       });
//   }, [cartTotal, cart_products, createPaymentIntent]);

//   //set shipping cost
//   const handleShippingCost = (value) => setShippingCost(value);
 

//   return {
//     clientSecret,
//     createPaymentIntent,
//     isLoading,
//     cartTotal,
//     shippingCost,
//     handleShippingCost,
//     register,
//     handleSubmit,
//     errors,
//   };
// };

// export default useCheckoutSubmit;
















'use client';
import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
//internal import
import useCartInfo from "./use-cart-info";
import { set_shipping } from "@/redux/features/order/orderSlice";
import { set_coupon } from "@/redux/features/coupon/couponSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import {useSaveOrderMutation} from "@/redux/features/order/orderApi";
import { useGetOfferCouponsQuery } from "@/redux/features/coupon/couponApi";

const useCheckoutSubmit = () => {
  // offerCoupons
  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
  // addOrder
  const [saveOrder, {}] = useSaveOrderMutation();
  // cart_products
  const { cart_products } = useSelector((state) => state.cart);
  // user
  const { user } = useSelector((state) => state.auth);
  // shipping_info
  const { shipping_info } = useSelector((state) => state.order);
  // total amount
  const { total, setTotal } = useCartInfo();
  // couponInfo
  const [couponInfo, setCouponInfo] = useState({});
  // couponUpdateTrigger
  const [couponUpdateTrigger, setCouponUpdateTrigger] = useState(0);
  //cartTotal
  const [cartTotal, setCartTotal] = useState("");
  // minimumAmount
  const [minimumAmount, setMinimumAmount] = useState(0);
  // shippingCost
  const [shippingCost, setShippingCost] = useState(0);
  // discountAmount
  const [discountAmount, setDiscountAmount] = useState(0);
  // discountPercentage
  const [discountPercentage, setDiscountPercentage] = useState(0);
  // discountProductType
  const [discountProductType, setDiscountProductType] = useState("");
  // isCheckoutSubmit
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  // cardError
  const [cardError, setCardError] = useState("");
  // clientSecret
  const [clientSecret, setClientSecret] = useState("");
  // showCard
  const [showCard, setShowCard] = useState(false);
  // coupon apply message
  const [couponApplyMsg,setCouponApplyMsg] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  // const stripe = useStripe();
  // const elements = useElements();

  const {register,handleSubmit,setValue,formState: { errors }} = useForm();

  let couponRef = useRef("");

  useEffect(() => {
    if (localStorage.getItem("couponInfo")) {
      const data = localStorage.getItem("couponInfo");
      const coupon = JSON.parse(data);
      console.log('Loading coupon from localStorage:', coupon);
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
      setDiscountProductType(coupon.productType);
      setCouponUpdateTrigger(prev => prev + 1); // Trigger recalculation
    }
  }, []);

  useEffect(() => {
    if (minimumAmount - discountAmount > total || cart_products.length === 0) {
      setDiscountPercentage(0);
      localStorage.removeItem("couponInfo");
    }
  }, [minimumAmount, total, discountAmount, cart_products]);

  //calculate total and discount value
  useEffect(() => {
    console.log('=== DISCOUNT CALCULATION DEBUG ===');
    console.log('Triggered by couponUpdateTrigger:', couponUpdateTrigger);
    console.log('Current discount percentage:', discountPercentage);
    console.log('Current discount product type:', discountProductType);
    console.log('Cart products:', cart_products);
    console.log('Total:', total);
    console.log('Shipping cost:', shippingCost);
    
    // Helper function to check if item matches discount product type
    const isMatchingProductType = (item) => {
      const categoryName = typeof item.category === 'string' 
        ? item.category 
        : item.category?.name;
      
      // Check multiple ways to identify thali items
      return (
        item.productType === discountProductType ||
        categoryName === discountProductType ||
        categoryName === 'Thali' ||
        categoryName === 'thali' ||
        item.parent === 'Thali' ||
        item.parent === discountProductType
      );
    };

    const result = cart_products?.filter(isMatchingProductType);
    console.log('Filtered products for discount:', result);
    
    const discountProductTotal = result?.reduce(
      (preValue, currentValue) =>
        preValue + currentValue.price * currentValue.orderQuantity,
      0
    );
    console.log('Discount product total:', discountProductTotal);
    
    let totalValue = "";
    let subTotal = Number((total + shippingCost).toFixed(2));
    let discountTotal = Number(
      discountProductTotal * (discountPercentage / 100)
    );
    totalValue = Number(subTotal - discountTotal);
    
    console.log('Calculated discount total:', discountTotal);
    console.log('Calculated cart total:', totalValue);
    console.log('Setting discount amount to:', discountTotal);
    
    setDiscountAmount(discountTotal);
    setCartTotal(totalValue);
  }, [
    total,
    shippingCost,
    discountPercentage,
    cart_products,
    discountProductType,
    couponUpdateTrigger,
  ]);

  // create payment intent - commented out for now
  // useEffect(() => {
  //   if (cartTotal) {
  //     createPaymentIntent({
  //       price: parseInt(cartTotal),
  //     })
  //       .then((data) => {
  //         setClientSecret(data?.data?.clientSecret);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [createPaymentIntent, cartTotal]);

  // handleCouponCode
  const handleCouponCode = (e) => {
    e.preventDefault();
    
    console.log('=== COUPON FUNCTION CALLED ===');
    console.log('Coupon input value:', couponRef.current?.value);

    if (!couponRef.current?.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    if (isLoading) {
      return <h3>Loading...</h3>;
    }
    if (isError) {
      return notifyError("Something went wrong");
    }

    const result = offerCoupons?.filter(
      (coupon) => coupon.couponCode === couponRef.current?.value
    );

    console.log('=== COUPON APPLICATION DEBUG ===');
    console.log('Available coupons:', offerCoupons);
    console.log('Searching for coupon code:', couponRef.current?.value);
    console.log('Found coupon result:', result);
    console.log('Current discount percentage:', discountPercentage);
    console.log('Current discount amount:', discountAmount);
    console.log('Current discount product type:', discountProductType);

    if (result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ₹${result[0].minimumAmount} required for Apply this coupon!`
      );
      return;
    } else {
      console.log('=== APPLYING NEW COUPON ===');
      console.log('Coupon details:', result[0]);
      console.log('New discount percentage:', result[0].discountPercentage);
      console.log('New product type:', result[0].productType);
      
      // Clear previous coupon state immediately
      console.log('Clearing previous coupon state...');
      setDiscountPercentage(0);
      setDiscountAmount(0);
      setDiscountProductType("");
      setMinimumAmount(0);
      setCouponApplyMsg("");
      localStorage.removeItem("couponInfo");
      dispatch(set_coupon(null));
      
      // Force immediate recalculation by setting all values at once
      console.log('Applying new coupon...');
      const newCoupon = result[0];
      const newDiscountPercentage = newCoupon.discountPercentage;
      const newProductType = newCoupon.productType;
      const newMinimumAmount = newCoupon.minimumAmount;
      
      console.log('New coupon values:', {
        discountPercentage: newDiscountPercentage,
        productType: newProductType,
        minimumAmount: newMinimumAmount
      });
      
      // Set all new values
      setCouponApplyMsg(`Your Coupon ${newCoupon.title} is Applied on ${newProductType} productType!`)
      setMinimumAmount(newMinimumAmount);
      setDiscountProductType(newProductType);
      setDiscountPercentage(newDiscountPercentage);
      dispatch(set_coupon(newCoupon));
      
      // Force immediate recalculation
      setCouponUpdateTrigger(prev => prev + 1);
      
      console.log('New coupon applied successfully!');
      
      setTimeout(() => {
        couponRef.current.value = "";
        setCouponApplyMsg("")
      }, 5000);
    }
  };

  // handleShippingCost
  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  // clearCoupon - function to clear current coupon
  const clearCoupon = () => {
    setDiscountPercentage(0);
    setDiscountAmount(0);
    setDiscountProductType("");
    setMinimumAmount(0);
    setCouponApplyMsg("");
    localStorage.removeItem("couponInfo");
    dispatch(set_coupon(null));
    setCouponUpdateTrigger(prev => prev + 1); // Trigger recalculation
  };

  //set values
  useEffect(() => {
    setValue("firstName", shipping_info.firstName);
    setValue("lastName", shipping_info.lastName);
    setValue("country", shipping_info.country);
    setValue("address", shipping_info.address);
    setValue("city", shipping_info.city);
    setValue("zipCode", shipping_info.zipCode);
    setValue("contactNo", shipping_info.contactNo);
    setValue("email", shipping_info.email);
    setValue("orderNote", shipping_info.orderNote);
  }, [user, setValue, shipping_info, router]);

  // submitHandler
  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);

    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contactNo,
      email: data.email,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption,
      status: "Pending",
      cart: cart_products,
      paymentMethod: data.payment,
      subTotal: total,
      shippingCost: shippingCost,
      discount: discountAmount,
      totalAmount: cartTotal,
      orderNote:data.orderNote,
      user: `${user?._id}`,
    };
    if (data.payment === 'Card') {
      // Stripe payment temporarily disabled
      notifyError("Card payment is temporarily unavailable. Please use Cash on Delivery.");
      setIsCheckoutSubmit(false);
      return;
      // if (!stripe || !elements) {
      //   return;
      // }
      // const card = elements.getElement(CardElement);
      // if (card == null) {
      //   return;
      // }
      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      //   type: 'card',
      //   card: card,
      // });
      // if (error && !paymentMethod) {
      //   setCardError(error.message);
      //   setIsCheckoutSubmit(false);
      // } else {
      //   setCardError('');
      //   const orderData = {
      //     ...orderInfo,
      //     cardInfo: paymentMethod,
      //   };

      //  return handlePaymentWithStripe(orderData);
      // }
    }
    if (data.payment === 'COD') {
      saveOrder({
        ...orderInfo
      }).then(res => {
        if(res?.error){
        }
        else {
          localStorage.removeItem("cart_products")
          localStorage.removeItem("couponInfo");
          setIsCheckoutSubmit(false)
          notifySuccess("Your Order Confirmed!");
          router.push(`/order/${res.data?.order?._id}`);
        }
      })
    }
  };


  // handlePaymentWithStripe - commented out for now
  // const handlePaymentWithStripe = async (order) => {
  //   try {
  //     const {paymentIntent, error:intentErr} = await stripe.confirmCardPayment(
  //       clientSecret,
  //       {
  //         payment_method: {
  //           card: elements.getElement(CardElement),
  //           billing_details: {
  //             name: user?.firstName,
  //             email: user?.email,
  //           },
  //         },
  //       },
  //     );
  //     if (intentErr) {
  //       notifyError(intentErr.message);
  //     } else {
  //       // notifySuccess("Your payment processed successfully");
  //     }

  //     const orderData = {
  //       ...order,
  //       paymentIntent,
  //     };

  //     saveOrder({
  //       ...orderData
  //     })
  //     .then((result) => {
  //         if(result?.error){
  //         }
  //         else {
  //           localStorage.removeItem("couponInfo");
  //           notifySuccess("Your Order Confirmed!");
  //           router.push(`/order/${result.data?.order?._id}`);
  //         }
  //       })
  //      } 
  //   catch (err) {
  //     console.log(err);
  //   }
  // };

  return {
    handleCouponCode,
    couponRef,
    handleShippingCost,
    clearCoupon,
    discountAmount,
    total,
    shippingCost,
    discountPercentage,
    discountProductType,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    cardError,
    submitHandler,
    // stripe, // commented out
    handleSubmit,
    // clientSecret, // commented out
    // setClientSecret, // commented out
    cartTotal,
    couponApplyMsg,
    showCard,
    setShowCard,
  };
};

export default useCheckoutSubmit;