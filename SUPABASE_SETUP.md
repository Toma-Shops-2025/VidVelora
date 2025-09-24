# Supabase Database Setup Guide

## 🚨 **URGENT: Database Tables Missing**

Your Supabase database is missing the required tables. Follow these steps to fix the 404 errors:

## 📋 **Step 1: Access Supabase SQL Editor**

1. **Go to your Supabase dashboard**: https://supabase.com/dashboard
2. **Select your project**: `ctaeolcyinfiwszipbmr`
3. **Click "SQL Editor"** in the left sidebar
4. **Click "New Query"**

## 📋 **Step 2: Run the Database Schema**

Copy and paste this entire SQL script into the SQL Editor:

```sql
-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  status TEXT CHECK (status IN ('generating', 'completed', 'failed')) DEFAULT 'generating',
  thumbnail_url TEXT,
  video_url TEXT,
  duration INTEGER, -- in seconds
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  duration_range TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0.0,
  uses_count INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT CHECK (plan IN ('starter', 'pro', 'enterprise')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'cancelled', 'expired')) DEFAULT 'active',
  credits_remaining INTEGER DEFAULT 0,
  videos_this_month INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- RLS Policies for videos
CREATE POLICY "Users can view own videos" ON videos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own videos" ON videos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own videos" ON videos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all videos" ON videos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- RLS Policies for templates
CREATE POLICY "Templates are viewable by all authenticated users" ON templates
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only admins can manage templates" ON templates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions" ON subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Insert sample templates
INSERT INTO templates (name, description, category, thumbnail_url, duration_range, rating, uses_count, is_premium) VALUES
('Corporate Presentation', 'Professional business presentation template', 'Business', 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680209912_5bcd63f1.webp', '2-5 min', 4.8, 1250, false),
('Educational Content', 'Perfect for tutorials and educational videos', 'Education', 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680211668_b19ab66e.webp', '3-8 min', 4.9, 980, false),
('Marketing Video', 'Engaging marketing and promotional content', 'Marketing', 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680213545_8e20321b.webp', '1-3 min', 4.7, 2100, true),
('Social Media', 'Optimized for social media platforms', 'Social', 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680215293_9001ac84.webp', '30s-2 min', 4.6, 3200, false),
('Training Module', 'Corporate training and onboarding videos', 'Training', 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680217291_3d244e0b.webp', '5-10 min', 4.8, 750, true),
('Product Demo', 'Showcase your products effectively', 'Product', 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680219110_6c14e5f2.webp', '2-4 min', 4.9, 1800, false);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON videos(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
```

## 📋 **Step 3: Execute the Script**

1. **Click "Run"** button in the SQL Editor
2. **Wait for completion** (should take a few seconds)
3. **Check for any errors** in the output

## 📋 **Step 4: Make Yourself Admin**

After the tables are created, run this query to make yourself admin:

```sql
-- Replace 'your-email@example.com' with your actual email address
UPDATE users SET is_admin = TRUE WHERE email = 'your-email@example.com';
```

## 📋 **Step 5: Test the Fix**

1. **Go back to your VidVelora app**
2. **Try signing in again**
3. **The 404 errors should be gone!**

## ✅ **What This Creates:**

- **`users` table** - Stores user profiles and admin status
- **`videos` table** - Stores generated videos
- **`templates` table** - Video templates with sample data
- **`subscriptions` table** - User subscription plans
- **Row Level Security (RLS)** - Proper data access controls
- **Admin privileges** - You'll have full admin access

## 🚨 **Important Notes:**

- **Run this immediately** - Your app won't work without these tables
- **Replace the email** in Step 4 with your actual email
- **This is a one-time setup** - You won't need to do this again

---

**After running this SQL, your authentication will work perfectly!** 🚀
