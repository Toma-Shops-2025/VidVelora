# Netlify Functions Setup Guide

## 🚀 **Step-by-Step Netlify Functions Setup**

### **Step 1: Install Netlify CLI**
```bash
npm install -g netlify-cli
```

### **Step 2: Create Functions Directory**
```bash
mkdir netlify
mkdir netlify/functions
```

### **Step 3: Move API Files**
Move these files to the correct location:
- `api/create-checkout-session.js` → `netlify/functions/create-checkout-session.js`
- `api/create-customer-portal-session.js` → `netlify/functions/create-customer-portal-session.js`
- `api/webhook.js` → `netlify/functions/webhook.js`

### **Step 4: Install Dependencies**
Create a `package.json` in your project root (if not already exists) and add:
```bash
npm install stripe @supabase/supabase-js
```

### **Step 5: Update Function Paths**
The functions are already configured to work with Netlify. They will be available at:
- `https://your-site.netlify.app/.netlify/functions/create-checkout-session`
- `https://your-site.netlify.app/.netlify/functions/create-customer-portal-session`
- `https://your-site.netlify.app/.netlify/functions/webhook`

### **Step 6: Deploy to Netlify**
```bash
# Login to Netlify
netlify login

# Deploy your site
netlify deploy --prod
```

### **Step 7: Set Up Stripe Webhook**
1. Go to your Stripe Dashboard
2. Go to **Developers** → **Webhooks**
3. Click **"Add endpoint"**
4. Enter your webhook URL: `https://your-site.netlify.app/.netlify/functions/webhook`
5. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. Click **"Add endpoint"**
7. Copy the **Webhook Secret** (starts with `whsec_`)
8. Add it to your Netlify environment variables as `STRIPE_WEBHOOK_SECRET`

## 🔧 **Alternative: Manual File Setup**

If you prefer to set up manually:

### **1. Create the directory structure:**
```
VidVelora/
├── netlify/
│   └── functions/
│       ├── create-checkout-session.js
│       ├── create-customer-portal-session.js
│       └── webhook.js
├── src/
├── package.json
└── ...
```

### **2. Copy the function files:**
Copy the content from `api/` folder to `netlify/functions/` folder.

### **3. Update your `package.json`:**
Make sure these dependencies are included:
```json
{
  "dependencies": {
    "stripe": "^14.21.0",
    "@supabase/supabase-js": "^2.49.4"
  }
}
```

## 🎯 **Quick Commands to Run**

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Create directories
mkdir netlify
mkdir netlify/functions

# 3. Move files (copy content from api/ to netlify/functions/)
# 4. Install dependencies
npm install stripe @supabase/supabase-js

# 5. Login to Netlify
netlify login

# 6. Deploy
netlify deploy --prod
```

## 🔍 **Verify Functions Are Working**

After deployment, test your functions:

### **Test Checkout Session:**
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_test","customerEmail":"test@example.com","userId":"test-user"}'
```

### **Test Webhook:**
1. Go to Stripe Dashboard → Webhooks
2. Click on your webhook endpoint
3. Click **"Send test webhook"**
4. Check if it receives the test event

## 🚨 **Common Issues & Solutions**

### **Issue: Functions not found**
- **Solution**: Make sure files are in `netlify/functions/` directory
- **Check**: Files should be `.js` not `.ts`

### **Issue: Dependencies not found**
- **Solution**: Run `npm install` in your project root
- **Check**: Make sure `stripe` and `@supabase/supabase-js` are in package.json

### **Issue: Environment variables not working**
- **Solution**: Add all variables to Netlify dashboard
- **Check**: Redeploy after adding variables

### **Issue: Webhook not receiving events**
- **Solution**: Check webhook URL is correct
- **Check**: Make sure webhook secret is set correctly

## ✅ **Success Checklist**

After setup, you should have:
- ✅ Functions deployed to Netlify
- ✅ Stripe webhook configured
- ✅ Environment variables set
- ✅ Test payments working
- ✅ Subscription management working

## 🎉 **You're Ready!**

Once Netlify Functions are set up, your VidVelora app will have:
- ✅ Real video generation with RunwayML
- ✅ Secure payment processing with Stripe
- ✅ User subscription management
- ✅ Revenue tracking and analytics

**Your AI video generation business is now fully operational!** 🚀💰
