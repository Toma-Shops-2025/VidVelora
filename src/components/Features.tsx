import React from 'react';
import { Zap, Brain, Palette, Globe, Shield, Headphones } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Generation',
      description: 'Advanced AI algorithms create professional videos from your text prompts in minutes.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate high-quality videos in under 5 minutes with our optimized processing pipeline.'
    },
    {
      icon: Palette,
      title: 'Customizable Styles',
      description: 'Choose from multiple video styles and customize colors, fonts, and layouts to match your brand.'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Create videos in over 40 languages with natural-sounding AI voices and accurate translations.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security. Your content is always protected and private.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team and comprehensive documentation.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Every Creator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create stunning videos from text, powered by cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-3 mr-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Content?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Join thousands of creators who are already using AI to create amazing videos from simple text prompts.
            </p>
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-colors">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;