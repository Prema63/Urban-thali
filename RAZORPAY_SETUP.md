# Razorpay Integration Setup

## Backend Configuration

Add these environment variables to your `.env` file in the `ut-backend` directory:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Getting Razorpay Credentials

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or log in to your account
3. Go to Settings > API Keys
4. Generate API Keys
5. Copy the Key ID and Key Secret
6. Add them to your `.env` file

## Frontend Changes Made

1. **Payment Options**: Added Razorpay option above Cash on Delivery
2. **Razorpay Script**: Added Razorpay checkout script to layout
3. **Payment Integration**: Complete Razorpay payment flow with verification

## Backend Changes Made

1. **Razorpay SDK**: Installed and configured Razorpay
2. **Payment Intent**: Updated to create Razorpay orders
3. **Payment Verification**: Added signature verification endpoint
4. **Routes**: Added verification route

## Testing

1. Start your backend server: `npm run dev` (in ut-backend)
2. Start your frontend server: `npm run dev` (in ut-front-end)
3. Go to checkout page
4. Select "Razorpay (Cards, UPI, Net Banking)" option
5. Complete the payment flow

## Payment Flow

1. User selects Razorpay payment option
2. Frontend calls backend to create Razorpay order
3. Razorpay checkout modal opens
4. User completes payment
5. Razorpay sends payment details to frontend
6. Frontend verifies payment with backend
7. Backend verifies Razorpay signature
8. Order is saved and user is redirected to order confirmation

## Features

- ✅ Cards (Credit/Debit)
- ✅ UPI
- ✅ Net Banking
- ✅ Wallets
- ✅ EMI
- ✅ Payment verification
- ✅ Order confirmation
- ✅ Error handling

