import React, { useState } from 'react';
import { Menu, X, User, Settings, LogOut, Video } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, signOut, isAdmin } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-2">
                <Video className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">VidVelora</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#home" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Home
            </a>
            <a 
              href="#templates" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Templates
            </a>
            <a 
              href="#features" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Pricing
            </a>
            <a 
              href="#dashboard" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Dashboard
            </a>
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <button 
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthModalOpen(true);
                  }}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
                {isAdmin && (
                  <a 
                    href="#admin" 
                    className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                  >
                    Admin Panel
                  </a>
                )}
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium hover:bg-purple-700 transition-colors"
                  >
                    {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.full_name || 'User'}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        {isAdmin && (
                          <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      <a href="#profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <User className="h-4 w-4 mr-3" />
                        Profile
                      </a>
                      <a href="#settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </a>
                      <hr className="my-1" />
                      <button 
                        onClick={signOut}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-purple-600 font-medium">
                Home
              </a>
              <a href="#templates" className="block px-3 py-2 text-gray-700 hover:text-purple-600 font-medium">
                Templates
              </a>
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-purple-600 font-medium">
                Features
              </a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-purple-600 font-medium">
                Pricing
              </a>
              <a href="#dashboard" className="block px-3 py-2 text-gray-700 hover:text-purple-600 font-medium">
                Dashboard
              </a>
              {!user ? (
                <div className="pt-4 pb-2 space-y-2">
                  <button 
                    onClick={() => {
                      setAuthMode('signin');
                      setAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      setAuthMode('signup');
                      setAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-lg font-medium"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <div className="pt-4 pb-2 space-y-2">
                  <div className="px-3 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.full_name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        mode={authMode} 
      />
    </header>
  );
};

export default Header;