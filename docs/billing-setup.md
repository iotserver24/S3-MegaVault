# MegaVault Billing Setup Guide

This document provides instructions for setting up the automated billing system for MegaVault using Stripe.

## Prerequisites

1. A Stripe account (create one at [stripe.com](https://stripe.com) if you don't have one)
2. MegaVault application set up locally for development

## Setup Steps

### 1. Create Products and Prices in Stripe

First, you need to create the necessary products and prices in your Stripe dashboard:

#### Base Plan
1. Go to Stripe Dashboard > Products > Add Product
2. Product name: "Base Plan"
3. Price: ₹30 / month (recurring)
4. Save the Price ID for later

#### Pro Plan
1. Create a new Product named "Pro Plan"
2. Price: ₹325 / month (recurring)
3. Save the Price ID for later

#### Enterprise Plan
1. Create a new Product named "Enterprise Plan"
2. Price: ₹3328 / month (recurring)
3. Save the Price ID for later

#### Additional Storage
1. Create a new Product named "Additional Storage"
2. Price: ₹3.5 / GB / month (recurring)
3. Save the Price ID for later

### 2. Setup Stripe Webhook

You'll need to set up a webhook to receive events from Stripe:

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add Endpoint"
3. Set the endpoint URL to `https://your-domain.com/api/webhooks/stripe` (or use a service like ngrok for local development)
4. Select the following events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Click "Add Endpoint"
6. Save the Webhook Signing Secret for later

### 3. Configure Environment Variables

Add the following environment variables to your project:

```
# Stripe
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_BASE_PLAN_PRICE_ID=price_xxxxxxxxxxxx
STRIPE_PRO_PLAN_PRICE_ID=price_xxxxxxxxxxxx
STRIPE_ENTERPRISE_PLAN_PRICE_ID=price_xxxxxxxxxxxx
STRIPE_STORAGE_PRICE_ID=price_xxxxxxxxxxxx
```

Replace the placeholder values with your actual Stripe API keys and price IDs.

### 4. Testing the Integration

1. Start your application
2. Navigate to the pricing page
3. Click on a plan to subscribe
4. Complete the checkout flow with a test card (e.g., 4242 4242 4242 4242)
5. Verify that the webhook events are received and processed correctly
6. Check that the user's subscription information is updated in Redis

### 5. Going Live

When you're ready to accept real payments:

1. Switch from Stripe's test mode to live mode in the Stripe Dashboard
2. Update your environment variables with the live API keys
3. Create products and prices in live mode
4. Update the price IDs in your environment variables
5. Set up webhooks for the live environment

## Troubleshooting

### Webhook Issues

If webhooks aren't being received:

1. Check the webhook endpoint URL is correct
2. Verify that your webhook secret is correctly set in your environment variables
3. Check Stripe Dashboard > Developers > Webhooks > select your endpoint > Recent Events to see if events are being sent and any delivery errors

### Subscription Issues

If subscriptions aren't being created or updated correctly:

1. Check the Redis database to verify user data is being stored correctly
2. Review the application logs for any errors during the checkout or webhook processing
3. Ensure that the price IDs in your environment variables match those in your Stripe dashboard

## Managing Subscriptions

### Admin Tasks

As an admin, you can perform the following tasks:

1. View active subscriptions in the Stripe Dashboard
2. Issue refunds if needed
3. Manage subscription items directly in Stripe
4. View subscription metrics and reports

### User Management

Users can manage their own subscriptions through:

1. The billing portal (which redirects to Stripe's hosted billing portal)
2. Their account dashboard in the MegaVault application

## Custom Development

If you need to extend the billing functionality:

1. Edit `src/lib/stripe.ts` to modify Stripe integration logic
2. Update webhooks in `src/app/api/webhooks/stripe/route.ts`
3. Modify the user interface in `src/app/dashboard/billing/page.tsx` 