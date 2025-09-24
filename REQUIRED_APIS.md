# Required APIs for VidVelora

## 🎯 **What You Actually Need (Required)**

### 1. **Supabase** ✅ (You already have this)
- Database and authentication
- Already configured in your Netlify environment variables

### 2. **RunwayML** ✅ (You need this for video generation)
- **Why**: This is your main video generation API
- **How to get API key**:
  1. Go to [runwayml.com](https://runwayml.com)
  2. Sign up for an account
  3. Go to **Settings** → **API Keys**
  4. Click **"Create New API Key"**
  5. Copy the key (starts with `rk_`)

### 3. **Stripe** ✅ (You need this for payments)
- **Why**: Handle subscription payments
- **How to get API keys**:
  1. Go to [stripe.com](https://stripe.com)
  2. Sign up and complete verification
  3. Go to **Developers** → **API Keys**
  4. Copy **Publishable Key** (starts with `pk_test_`)
  5. Copy **Secret Key** (starts with `sk_test_`)

## ❌ **What You DON'T Need Right Now (Optional)**

### **Stability AI** - NOT REQUIRED
- **Why not needed**: RunwayML is your primary video generation API
- **When you might want it**: Later for cost optimization or variety
- **Current status**: Skip this for now

## 🚀 **Minimum Setup to Get Started**

### **Required Environment Variables:**
```env
# Supabase (you have these)
VITE_SUPABASE_URL=https://ctaeolcyinfiwszipbmr.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# RunwayML (you need this)
VITE_RUNWAY_API_KEY=your_runway_api_key

# Stripe (you need this)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### **Optional (Skip for now):**
```env
# These are optional - you can add them later
VITE_STABILITY_API_KEY=not_needed_right_now
VITE_GA_TRACKING_ID=not_needed_right_now
```

## 🎬 **How Your App Works Without Stability AI**

1. **User enters text prompt**
2. **App calls RunwayML API** (your main video generator)
3. **RunwayML creates the video**
4. **Video is saved to your database**
5. **User can download/share the video**

## 💰 **Revenue Without Stability AI**

- ✅ **Stripe handles all payments**
- ✅ **RunwayML generates all videos**
- ✅ **Supabase manages users and data**
- ✅ **You can start making money immediately**

## 🔧 **Quick Setup Checklist**

### **Step 1: Get RunwayML API Key (5 minutes)**
1. Go to [runwayml.com](https://runwayml.com)
2. Sign up for account
3. Go to Settings → API Keys
4. Create new API key
5. Copy the key

### **Step 2: Get Stripe Keys (10 minutes)**
1. Go to [stripe.com](https://stripe.com)
2. Create account and verify
3. Go to Developers → API Keys
4. Copy both keys

### **Step 3: Add to Netlify**
1. Go to your Netlify site dashboard
2. Go to Site Settings → Environment Variables
3. Add the new variables
4. Redeploy your site

## 🎉 **You're Ready to Launch!**

With just **RunwayML + Stripe + Supabase**, your VidVelora app will:
- ✅ Generate real AI videos
- ✅ Process payments securely
- ✅ Manage user accounts
- ✅ Track subscriptions
- ✅ Start generating revenue

**Skip Stability AI for now - you can add it later if you want more video generation options!**
