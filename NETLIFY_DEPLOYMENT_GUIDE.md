# Netlify Deployment Guide (Without CLI)

Since PowerShell execution policy is blocking the CLI, here's how to deploy your functions through the Netlify dashboard:

## 🚀 **Method 1: Automatic Deployment (Recommended)**

### **Step 1: Your Functions Are Already Ready**
✅ Your functions are already in the `netlify/functions/` directory
✅ They're committed to GitHub
✅ Netlify will automatically detect and deploy them

### **Step 2: Check Your Netlify Site**
1. Go to your **Netlify Dashboard**
2. Find your VidVelora site
3. Check if it's already deployed with the latest changes
4. If not, click **"Trigger deploy"** or **"Deploy site"**

### **Step 3: Verify Functions Are Working**
Your functions will be available at:
- `https://your-site-name.netlify.app/.netlify/functions/create-checkout-session`
- `https://your-site-name.netlify.app/.netlify/functions/create-customer-portal-session`
- `https://your-site-name.netlify.app/.netlify/functions/webhook`

## 🔧 **Method 2: Manual Function Setup (If Needed)**

If the functions aren't automatically detected:

### **Step 1: Go to Netlify Dashboard**
1. Go to your site dashboard
2. Click **"Functions"** tab
3. Check if your functions are listed

### **Step 2: Manual Upload (If Required)**
1. Go to **Functions** tab
2. Click **"Add function"**
3. Upload each function file:
   - `netlify/functions/create-checkout-session.js`
   - `netlify/functions/create-customer-portal-session.js`
   - `netlify/functions/webhook.js`

## 🎯 **Step 3: Set Up Stripe Webhook**

### **1. Get Your Site URL**
- Go to your Netlify site dashboard
- Copy your site URL (e.g., `https://amazing-name-123456.netlify.app`)

### **2. Set Up Stripe Webhook**
1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Enter webhook URL: `https://your-site-name.netlify.app/.netlify/functions/webhook`
4. Select these events:
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`
5. Click **"Add endpoint"**
6. Copy the **Webhook Secret** (starts with `whsec_`)

### **3. Add Webhook Secret to Netlify**
1. Go to your **Netlify site dashboard**
2. Go to **Site settings** → **Environment variables**
3. Add new variable:
   - **Key**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: `whsec_your_webhook_secret_here`
4. Click **"Save"**

## ✅ **Test Your Functions**

### **Test 1: Check Function URLs**
Visit these URLs in your browser:
- `https://your-site.netlify.app/.netlify/functions/create-checkout-session`
- `https://your-site.netlify.app/.netlify/functions/webhook`

You should see function responses (not 404 errors).

### **Test 2: Test Stripe Integration**
1. Go to your VidVelora site
2. Try to subscribe to a plan
3. Check if Stripe checkout opens
4. Complete a test payment

## 🎉 **You're Done!**

Once these steps are complete, your VidVelora app will have:
- ✅ **Real AI video generation** with RunwayML
- ✅ **Secure payment processing** with Stripe
- ✅ **User subscription management**
- ✅ **Revenue tracking and analytics**

**Your AI video generation business is now fully operational!** 🚀💰

## 🆘 **If You Need Help**

### **Common Issues:**
1. **Functions not found**: Check if they're in `netlify/functions/` directory
2. **Webhook not working**: Verify the URL is correct
3. **Environment variables**: Make sure all are set in Netlify dashboard

### **Quick Fixes:**
- **Redeploy**: Trigger a new deployment in Netlify
- **Check logs**: Go to Functions tab and check for errors
- **Test locally**: Use `npm run dev` to test locally first
