# VidVelora API Integration Setup

## 🎬 Video Generation APIs

### 1. **RunwayML (Recommended)**

#### Setup Steps:
1. **Sign up**: Go to [runwayml.com](https://runwayml.com)
2. **Get API Key**: 
   - Go to Settings → API Keys
   - Create a new API key
   - Copy the key

3. **Add to Environment Variables**:
   ```env
   VITE_RUNWAY_API_KEY=your_runway_api_key_here
   ```

4. **Pricing**: $12-95/month based on usage
5. **Features**: High-quality text-to-video, image-to-video
6. **Quality**: Professional-grade output

### 2. **Stability AI (Alternative)**

#### Setup Steps:
1. **Sign up**: Go to [stability.ai](https://stability.ai)
2. **Get API Key**: 
   - Go to API Keys section
   - Generate new key
   - Copy the key

3. **Add to Environment Variables**:
   ```env
   VITE_STABILITY_API_KEY=your_stability_api_key_here
   ```

4. **Pricing**: $0.20-0.80 per video
5. **Features**: Cost-effective video generation
6. **Quality**: Good quality, fast generation

## 💳 Payment Processing

### **Stripe (Recommended)**

#### Setup Steps:

1. **Create Stripe Account**:
   - Go to [stripe.com](https://stripe.com)
   - Sign up for a new account
   - Complete business verification

2. **Get API Keys**:
   - Go to Developers → API Keys
   - Copy **Publishable Key** and **Secret Key**

3. **Add to Environment Variables**:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

4. **Create Products and Prices**:
   - Go to Products in Stripe Dashboard
   - Create 3 products:
     - **Starter Plan**: $9/month
     - **Pro Plan**: $29/month  
     - **Enterprise Plan**: $99/month
   - Note down the Price IDs (price_xxx)

5. **Set up Webhooks**:
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-domain.netlify.app/api/webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy the webhook secret

## 🔧 Netlify Functions Setup

### 1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

### 2. **Create Functions Directory**:
   ```bash
   mkdir netlify/functions
   ```

### 3. **Move API Files**:
   - Move `api/create-checkout-session.js` to `netlify/functions/`
   - Move `api/create-customer-portal-session.js` to `netlify/functions/`
   - Move `api/webhook.js` to `netlify/functions/`

### 4. **Install Dependencies**:
   ```bash
   npm install stripe @supabase/supabase-js
   ```

### 5. **Deploy Functions**:
   ```bash
   netlify deploy --prod
   ```

## 🎯 Complete Environment Variables

Add these to your Netlify environment variables:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Video Generation
VITE_RUNWAY_API_KEY=your_runway_api_key
VITE_STABILITY_API_KEY=your_stability_api_key

# Optional Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id
```

## 🚀 Implementation Steps

### Phase 1: Basic Integration
1. ✅ Set up RunwayML API
2. ✅ Set up Stripe payments
3. ✅ Deploy Netlify functions
4. ✅ Test video generation
5. ✅ Test payment flow

### Phase 2: Enhanced Features
1. ✅ Add multiple video APIs
2. ✅ Implement usage tracking
3. ✅ Add subscription management
4. ✅ Set up analytics

### Phase 3: Advanced Features
1. ✅ White-label options
2. ✅ API access for developers
3. ✅ Advanced billing features
4. ✅ Enterprise features

## 💰 Revenue Model

### **Subscription Plans**:
- **Starter**: $9/month - 10 videos
- **Pro**: $29/month - 50 videos  
- **Enterprise**: $99/month - Unlimited

### **Usage Tracking**:
- Track videos generated per user
- Enforce plan limits
- Upgrade prompts when limits reached

### **Revenue Optimization**:
- Free trial with limited videos
- Upgrade prompts at key moments
- Annual discounts for retention

## 🔐 Security Considerations

### **API Security**:
- ✅ Environment variables for API keys
- ✅ Server-side API calls only
- ✅ Rate limiting on video generation
- ✅ User authentication required

### **Payment Security**:
- ✅ Stripe handles PCI compliance
- ✅ Webhook signature verification
- ✅ Secure customer data handling
- ✅ Fraud protection

## 📊 Monitoring & Analytics

### **Track These Metrics**:
- Video generation success rate
- Payment conversion rates
- User engagement metrics
- API usage and costs
- Revenue per user

### **Set Up Alerts**:
- API failures
- Payment failures
- High usage spikes
- Revenue milestones

## 🆘 Troubleshooting

### **Common Issues**:

**Video Generation Fails**:
- Check API key validity
- Verify API quota/limits
- Check network connectivity
- Review error logs

**Payment Issues**:
- Verify Stripe keys
- Check webhook configuration
- Test in Stripe test mode
- Review payment logs

**Function Deployment**:
- Check Netlify function logs
- Verify environment variables
- Test function endpoints
- Review deployment status

## 🎉 Success Metrics

After setup, you should have:
- ✅ Working video generation
- ✅ Successful payment processing
- ✅ User subscription management
- ✅ Real-time webhook handling
- ✅ Secure API integration
- ✅ Revenue tracking

Your VidVelora platform is now ready to generate revenue! 🚀💰
