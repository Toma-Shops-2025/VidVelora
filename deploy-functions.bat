@echo off
echo Setting up Netlify Functions for VidVelora...

echo.
echo Step 1: Installing Netlify CLI...
npm install -g netlify-cli

echo.
echo Step 2: Installing dependencies...
npm install stripe @supabase/supabase-js

echo.
echo Step 3: Functions are ready!
echo Your functions are now in netlify/functions/
echo.

echo Next steps:
echo 1. Run: netlify login
echo 2. Run: netlify deploy --prod
echo 3. Set up Stripe webhook with your deployed URL
echo.

echo Functions created:
echo - create-checkout-session.js
echo - create-customer-portal-session.js  
echo - webhook.js
echo.

pause
