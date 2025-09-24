# Fix Supabase Email Confirmation Redirect

## 🚨 **The Problem:**
When you confirm your email, Supabase tries to redirect to `localhost:3000` but your dev server isn't running, causing the "connection refused" error.

## 🔧 **Solution 1: Start Your Development Server**

### **Start the dev server:**
```bash
npm run dev
```

This will start your VidVelora app on `localhost:3000` (or another port), and the redirect will work.

## 🔧 **Solution 2: Fix Supabase Redirect URL**

### **Step 1: Go to Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Go to **Authentication** → **URL Configuration**

### **Step 2: Update Redirect URLs**
Add these URLs to your **Site URL** and **Redirect URLs**:

**Site URL:**
```
http://localhost:3000
```

**Redirect URLs:**
```
http://localhost:3000
http://localhost:3000/dashboard
http://localhost:3000/auth/callback
https://your-site-name.netlify.app
https://your-site-name.netlify.app/dashboard
https://your-site-name.netlify.app/auth/callback
```

### **Step 3: Save Changes**
Click **"Save"** to update the configuration.

## 🔧 **Solution 3: Use Netlify URL (Recommended)**

### **For Production:**
1. **Get your Netlify site URL** (e.g., `https://amazing-name-123456.netlify.app`)
2. **Update Supabase redirect URLs** to use your live site:
   ```
   https://your-site-name.netlify.app
   https://your-site-name.netlify.app/dashboard
   https://your-site-name.netlify.app/auth/callback
   ```

## 🎯 **Quick Fix (Right Now):**

### **Option 1: Start Dev Server**
```bash
npm run dev
```
Then click the confirmation link again.

### **Option 2: Use Live Site**
1. Go to your live Netlify site
2. Try to sign up there instead
3. The redirect will work on the live site

## ✅ **After Fixing:**

### **Test the Flow:**
1. **Go to your VidVelora site**
2. **Click "Get Started" or "Start Creating"**
3. **Sign up with your email**
4. **Check your email for confirmation link**
5. **Click the confirmation link**
6. **You should be redirected back to your site and logged in**

## 🚀 **For Production:**

### **Update Supabase Settings:**
- **Site URL**: `https://your-site-name.netlify.app`
- **Redirect URLs**: Include both localhost (for development) and your live site

### **Test on Live Site:**
1. **Deploy your site to Netlify**
2. **Test signup on the live site**
3. **Email confirmation should redirect to your live site**

## 🎉 **You're All Set!**

Once you fix the redirect URL, your authentication flow will work perfectly:
- ✅ **User signs up** → **Gets confirmation email** → **Clicks link** → **Redirected to your site** → **Logged in**

The key is making sure Supabase knows where to redirect users after they confirm their email!
