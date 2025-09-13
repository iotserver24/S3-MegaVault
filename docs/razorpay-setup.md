# MegaVault Razorpay Integration Guide

This document provides instructions for setting up automated billing in MegaVault using Razorpay, an Indian payment gateway.

## Prerequisites

1. A Razorpay account (create one at [razorpay.com](https://razorpay.com) if you don't have one)
2. MegaVault application set up locally for development

## Setup Steps

### 1. Razorpay Account Setup

1. Sign up for a Razorpay account at [razorpay.com](https://razorpay.com)
2. Complete the KYC process to activate your account
3. Once approved, navigate to Dashboard > Account & Settings > API Keys
4. Generate a pair of API keys (Key ID and Key Secret)
5. Keep these keys secure and never expose them in client-side code

### 2. Create Plans in Razorpay

To set up the subscription plans:

1. Go to Razorpay Dashboard > Products > Subscriptions > Plans
2. Click "Create Plan"
3. Create the following plans:

#### Base Plan
- Plan Name: Base Plan
- Description: 10 GB Storage
- Amount: ₹30
- Billing Frequency: Monthly
- Additional Fields: Keep defaults or customize as needed
- Save the Plan ID for later

#### Pro Plan
- Plan Name: Pro Plan
- Description: 100 GB Storage
- Amount: ₹325
- Billing Frequency: Monthly
- Additional Fields: Keep defaults or customize as needed
- Save the Plan ID for later

#### Enterprise Plan
- Plan Name: Enterprise Plan
- Description: 1 TB Storage
- Amount: ₹3328
- Billing Frequency: Monthly
- Additional Fields: Keep defaults or customize as needed
- Save the Plan ID for later

### 3. Configure Webhooks

Set up webhooks to receive events from Razorpay:

1. Go to Razorpay Dashboard > Settings > Webhooks
2. Click "Add New Webhook"
3. Set URL to: `https://your-domain.com/api/webhooks/razorpay`
4. Set Secret: Create a strong, random string to use as your webhook secret
5. Select Events:
   - payment.authorized
   - payment.failed
   - subscription.activated
   - subscription.charged
   - subscription.completed
   - subscription.cancelled
6. Save the webhook

### 4. Environment Variables Setup

Add the following environment variables to your project:

```
# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
RAZORPAY_BASE_PLAN_ID=plan_xxxxxxxxxx
RAZORPAY_PRO_PLAN_ID=plan_xxxxxxxxxx
RAZORPAY_ENTERPRISE_PLAN_ID=plan_xxxxxxxxxx
```

Replace the placeholder values with your actual Razorpay keys and plan IDs.

### 5. Testing the Integration

Follow these steps to test the payment flow:

1. Start your application
2. Navigate to the pricing page
3. Click on a plan to subscribe
4. Complete the checkout flow using Razorpay test cards:
   - Success: 4111 1111 1111 1111
   - Expiry: Any future date
   - CVV: Any 3 digits
   - Name: Any name
   - 3D Secure: Use OTP "1234"
5. Verify that the webhook events are received and processed
6. Check that user subscription details are updated in Redis

### 6. Going Live

When you're ready to accept real payments:

1. Complete all Razorpay compliance requirements
2. Switch from test mode to live mode in Razorpay
3. Update your environment variables with the live API keys
4. Create plans in live mode
5. Update the plan IDs in your environment variables
6. Set up webhooks for the live environment

## Testing Cards for Development

Razorpay provides the following test cards:

| Card Network | Card Number         | Status  |
|--------------|---------------------|---------|
| Visa         | 4111 1111 1111 1111 | Success |
| Mastercard   | 5267 3181 8797 5449 | Success |
| RuPay        | 6062 8206 0444 8584 | Success |
| Visa         | 4000 0000 0000 0002 | Failure |

For more test cards, refer to [Razorpay's documentation](https://razorpay.com/docs/payments/payments/test-card-details/).

## Troubleshooting

### Webhook Issues

If webhooks aren't being received:

1. Check the webhook URL is correctly set in Razorpay
2. Verify that your webhook secret matches what's in your environment variables
3. Use Razorpay's webhook testing tool to send test events
4. Check Razorpay Dashboard > Settings > Webhooks to see delivery status

### Payment Issues

If payments aren't processing:

1. Check browser console for JavaScript errors
2. Verify that the correct Razorpay Key ID is being used
3. Check that all required parameters are being passed to Razorpay checkout
4. Review Razorpay Dashboard > Transactions for payment attempts and errors

## Understanding Razorpay Flow

In MegaVault's implementation, the payment flow is as follows:

1. User selects a plan on the pricing page
2. Backend creates an order in Razorpay
3. Frontend initializes Razorpay checkout with the order ID
4. User completes payment in the Razorpay popup
5. Razorpay calls your webhook with payment events
6. Backend verifies the payment and updates user subscription details
7. User is granted access to the plan features

## Managing Subscriptions

### Admin Tasks

As an admin, you can:

1. View and manage all transactions in the Razorpay Dashboard
2. Process refunds when needed
3. View customer information and payment history
4. Generate reports on subscription metrics

### User Management

Users can manage their subscriptions through:

1. The subscription management page in the MegaVault dashboard
2. Cancel or change plans as needed
3. View their billing history

## Customizing the Integration

If you need to extend or modify the Razorpay integration:

1. Edit `src/lib/razorpay.ts` to modify Razorpay configuration
2. Update webhook handlers in `src/app/api/webhooks/razorpay/route.ts`
3. Modify the payment UI in `src/app/dashboard/billing/page.tsx` 