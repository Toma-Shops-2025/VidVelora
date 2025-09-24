# Stripe Testing & Going Live Guide

## 🧪 **Step 1: Test Payments in Stripe Test Mode**

### **Test Credit Card Numbers (Use These):**
```
✅ Successful Payment:
- Card: 4242 4242 4242 4242
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

❌ Failed Payment:
- Card: 4000 0000 0000 0002
- This will decline to test error handling

💳 Other Test Cards:
- 4000 0000 0000 9995 (Insufficient funds)
- 4000 0000 0000 9987 (Lost card)
- 4000 0000 0000 9979 (Stolen card)
```

### **How to Test:**
1. **Go to your VidVelora site**
2. **Click "Subscribe" on any plan**
3. **Stripe checkout will open**
4. **Use test card: 4242 4242 4242 4242**
5. **Complete the payment**
6. **Check if you get redirected back to your site**

### **What to Check:**
- ✅ Checkout opens correctly
- ✅ Payment processes successfully
- ✅ You get redirected back to your site
- ✅ User account is created in Supabase
- ✅ Subscription is recorded in database

## 🚀 **Step 2: Going Live with Stripe**

### **Step 2.1: Complete Stripe Account Setup**
1. **Go to Stripe Dashboard**
2. **Complete Business Verification:**
   - Go to **Settings** → **Business settings**
   - Fill in your business information
   - Upload required documents (ID, business license, etc.)
   - Add bank account for payouts

### **Step 2.2: Switch to Live Mode**
1. **In Stripe Dashboard, toggle "Test mode" OFF**
2. **You'll see "Live mode" at the top**
3. **Get your LIVE API keys:**
   - Go to **Developers** → **API Keys**
   - Copy **Live Publishable Key** (starts with `pk_live_`)
   - Copy **Live Secret Key** (starts with `sk_live_`)

### **Step 2.3: Update Environment Variables**
**In your Netlify dashboard:**
1. Go to **Site settings** → **Environment variables**
2. **Update these variables:**
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
   STRIPE_SECRET_KEY=sk_live_your_live_secret_key
   ```
3. **Keep the webhook secret the same**
4. **Click "Save"**

### **Step 2.4: Set Up Live Webhook**
1. **Go to Stripe Dashboard** → **Developers** → **Webhooks**
2. **Create new webhook for LIVE mode:**
   - **Endpoint URL**: `https://your-site.netlify.app/.netlify/functions/webhook`
   - **Events to send:**
     - ✅ `checkout.session.completed`
     - ✅ `customer.subscription.created`
     - ✅ `customer.subscription.updated`
     - ✅ `customer.subscription.deleted`
     - ✅ `invoice.payment_succeeded`
     - ✅ `invoice.payment_failed`
3. **Copy the new LIVE webhook secret**
4. **Update in Netlify:**
   - **Key**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: `whsec_your_live_webhook_secret`

### **Step 2.5: Create Live Products and Prices**
1. **In Stripe Dashboard (Live mode):**
2. **Go to Products**
3. **Create your subscription plans:**
   - **Starter Plan**: $9/month
   - **Pro Plan**: $29/month
   - **Enterprise Plan**: $99/month
4. **Note down the LIVE Price IDs** (they'll be different from test ones)

### **Step 2.6: Update Price IDs in Your Code**
**Update your pricing component with LIVE price IDs:**
```javascript
const plans = [
  {
    name: 'Starter',
    price: '$9',
    priceId: 'price_live_starter_id', // Replace with your live price ID
    // ... rest of plan
  },
  {
    name: 'Pro', 
    price: '$29',
    priceId: 'price_live_pro_id', // Replace with your live price ID
    // ... rest of plan
  },
  {
    name: 'Enterprise',
    price: '$99', 
    priceId: 'price_live_enterprise_id', // Replace with your live price ID
    // ... rest of plan
  }
];
```

## 🎯 **Step 3: Final Testing Before Going Live**

### **Test with Real Payment Methods:**
1. **Use your own credit card** (small amount)
2. **Test the full flow:**
   - Sign up → Subscribe → Pay → Get redirected
3. **Check Stripe Dashboard:**
   - Payment appears in live mode
   - Customer is created
   - Subscription is active

### **Test All Scenarios:**
- ✅ Successful payment
- ✅ Failed payment (declined card)
- ✅ Subscription cancellation
- ✅ Subscription renewal
- ✅ Webhook events are received

## 🚨 **Important: Before Going Live**

### **Legal Requirements:**
- ✅ **Terms of Service** (add to your site)
- ✅ **Privacy Policy** (add to your site)
- ✅ **Refund Policy** (add to your site)
- ✅ **Business license** (if required in your area)

### **Technical Requirements:**
- ✅ **SSL Certificate** (Netlify provides this automatically)
- ✅ **Domain verification** (if using custom domain)
- ✅ **Error handling** (already implemented)
- ✅ **User authentication** (already implemented)

## 💰 **Step 4: Start Making Money!**

### **Once Live:**
1. **Share your VidVelora site**
2. **Start marketing your AI video generation service**
3. **Monitor payments in Stripe Dashboard**
4. **Track user growth in Supabase**
5. **Optimize based on user feedback**

### **Revenue Tracking:**
- **Stripe Dashboard**: See all payments and revenue
- **Supabase**: Track user growth and engagement
- **Netlify Analytics**: Monitor site performance

## 🎉 **Congratulations!**

Your VidVelora AI video generation business is now:
- ✅ **Live and accepting real payments**
- ✅ **Generating real AI videos**
- ✅ **Managing user subscriptions**
- ✅ **Ready to scale and grow**

**You're now officially in business!** 🚀💰

## 🆘 **If You Need Help**

### **Common Issues:**
1. **Webhook not working**: Check URL and secret
2. **Payments not processing**: Verify API keys are live
3. **Users not being created**: Check Supabase connection

### **Support Resources:**
- **Stripe Support**: [support.stripe.com](https://support.stripe.com)
- **Netlify Support**: [netlify.com/support](https://netlify.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
