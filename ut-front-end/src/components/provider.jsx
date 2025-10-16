'use client';

import React, { useEffect } from 'react';
import store from "@/redux/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Script from 'next/script';

const Providers = ({ children }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        {children}
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default Providers;


