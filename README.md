# VidVelora - AI Video Generation Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18-blue" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue" alt="TypeScript 5.0" />
  <img src="https://img.shields.io/badge/Vite-5.0-purple" alt="Vite 5.0" />
  <img src="https://img.shields.io/badge/Supabase-Backend-green" alt="Supabase Backend" />
  <img src="https://img.shields.io/badge/Netlify-Deployed-orange" alt="Netlify Deployed" />
</div>

## 🎬 Transform Text into Stunning Videos with AI

VidVelora is a cutting-edge AI video generation platform that transforms simple text prompts into professional, engaging videos. Perfect for content creators, marketers, educators, and businesses looking to scale their video content production.

## ✨ Key Features

### 🤖 AI-Powered Video Generation
- **Text-to-Video**: Transform any text prompt into professional videos
- **Multiple Styles**: Choose from various video styles and templates
- **Real-time Progress**: Live tracking of video generation process
- **High Quality**: Generate HD and 4K videos

### 🎨 Professional Templates
- **Business Presentations**: Corporate and professional content
- **Educational Videos**: Tutorials and learning materials
- **Marketing Content**: Promotional and advertising videos
- **Social Media**: Optimized for various platforms
- **Training Modules**: Corporate training and onboarding

### 👥 User Management
- **Secure Authentication**: Supabase-powered user system
- **Admin Panel**: Complete user and content management
- **Role-based Access**: Admin and user permissions
- **User Dashboard**: Personal video management

### 🚀 Modern Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Netlify with automatic CI/CD
- **State Management**: React Context + TanStack Query

## 🎯 Attention-Grabbing Features

### 📊 Live Statistics
- Animated counters showing platform success
- Real-time user engagement metrics
- Video generation statistics

### 💬 Social Proof
- Customer testimonial carousel
- User success stories
- Platform growth indicators

### 🔔 Smart Notifications
- Rotating promotional banners
- User engagement prompts
- Feature announcements

### 📱 Mobile-First Design
- Responsive across all devices
- Touch-friendly interactions
- Optimized mobile experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Netlify account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Toma-Shops-2025/VidVelora.git
   cd VidVelora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Set up Supabase database**
   - Go to your Supabase project
   - Run the SQL script from `src/lib/database.sql`
   - Make yourself admin: `UPDATE users SET is_admin = TRUE WHERE email = 'your-email@example.com';`

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: `18`

2. **Set environment variables**
   - Add your Supabase credentials in Netlify dashboard
   - Deploy your site

3. **Custom domain** (optional)
   - Add your domain in Netlify settings
   - Configure DNS as instructed

### Other Deployment Options
- **Vercel**: `vercel --prod`
- **AWS Amplify**: Connect GitHub repository
- **GitHub Pages**: Configure for static hosting

## 📁 Project Structure

```
VidVelora/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── AdminPanel.tsx
│   │   ├── AuthModal.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   ├── contexts/         # React contexts
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities and services
│   ├── pages/           # Page components
│   └── App.tsx
├── netlify.toml         # Netlify configuration
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Supabase Setup
1. Create a new Supabase project
2. Run the database schema from `src/lib/database.sql`
3. Configure Row Level Security (RLS)
4. Set up authentication providers

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.ts`
- Replace logo in `src/components/Header.tsx`
- Modify meta tags in `index.html`

### Features
- Add new video templates in database
- Customize pricing plans in `src/components/Pricing.tsx`
- Modify user roles and permissions

## 📊 Analytics & Monitoring

### Built-in Features
- Netlify Analytics (automatic)
- Supabase real-time monitoring
- Error boundary for crash reporting

### Optional Integrations
- Google Analytics
- Sentry error tracking
- Custom analytics solutions

## 🔐 Security

### Implemented Security Features
- ✅ HTTPS enforcement
- ✅ Security headers (XSS, CSRF protection)
- ✅ Row Level Security (RLS)
- ✅ Input validation and sanitization
- ✅ Secure authentication flow
- ✅ Admin access controls

## 🚀 Performance

### Optimizations
- ✅ Vite build optimization
- ✅ Code splitting and lazy loading
- ✅ Image optimization
- ✅ CDN delivery via Netlify
- ✅ Gzip compression
- ✅ Browser caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `SETUP.md` and `DEPLOYMENT.md` files
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🎉 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Supabase** for the backend infrastructure
- **Netlify** for seamless deployment
- **Vite** for the lightning-fast build system

---

<div align="center">
  <strong>Built with ❤️ for the future of video content creation</strong>
</div>
