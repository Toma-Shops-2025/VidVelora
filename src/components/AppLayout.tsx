import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import Hero from './Hero';
import VideoGenerator from './VideoGenerator';
import VideoTemplates from './VideoTemplates';
import Features from './Features';
import Dashboard from './Dashboard';
import Pricing from './Pricing';
import Footer from './Footer';
import NotificationBanner from './NotificationBanner';
import TestimonialCarousel from './TestimonialCarousel';
import LiveStats from './LiveStats';
import AdminPanel from './AdminPanel';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <NotificationBanner />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="create">
          <VideoGenerator />
        </section>
        <section id="templates">
          <VideoTemplates />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="testimonials">
          <TestimonialCarousel />
        </section>
        <section id="stats">
          <LiveStats />
        </section>
        <section id="dashboard">
          <Dashboard />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="admin">
          <AdminPanel />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
