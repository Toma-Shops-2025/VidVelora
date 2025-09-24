import React from 'react';
import { Play, Clock, Star } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  rating: number;
  uses: number;
}

const VideoTemplates: React.FC = () => {
  const templates: Template[] = [
    {
      id: '1',
      title: 'Corporate Presentation',
      description: 'Professional business presentation template',
      thumbnail: 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680209912_5bcd63f1.webp',
      duration: '2-5 min',
      category: 'Business',
      rating: 4.8,
      uses: 1250
    },
    {
      id: '2',
      title: 'Educational Content',
      description: 'Perfect for tutorials and educational videos',
      thumbnail: 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680211668_b19ab66e.webp',
      duration: '3-8 min',
      category: 'Education',
      rating: 4.9,
      uses: 980
    },
    {
      id: '3',
      title: 'Marketing Video',
      description: 'Engaging marketing and promotional content',
      thumbnail: 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680213545_8e20321b.webp',
      duration: '1-3 min',
      category: 'Marketing',
      rating: 4.7,
      uses: 2100
    },
    {
      id: '4',
      title: 'Social Media',
      description: 'Optimized for social media platforms',
      thumbnail: 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680215293_9001ac84.webp',
      duration: '30s-2 min',
      category: 'Social',
      rating: 4.6,
      uses: 3200
    },
    {
      id: '5',
      title: 'Training Module',
      description: 'Corporate training and onboarding videos',
      thumbnail: 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680217291_3d244e0b.webp',
      duration: '5-10 min',
      category: 'Training',
      rating: 4.8,
      uses: 750
    },
    {
      id: '6',
      title: 'Product Demo',
      description: 'Showcase your products effectively',
      thumbnail: 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680219110_6c14e5f2.webp',
      duration: '2-4 min',
      category: 'Product',
      rating: 4.9,
      uses: 1800
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Video Templates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of professionally designed templates to get started quickly
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <button className="bg-white/90 hover:bg-white text-purple-600 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                    <Play className="h-6 w-6" />
                  </button>
                </div>
                <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {template.category}
                </div>
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {template.duration}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{template.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{template.uses.toLocaleString()} uses</span>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTemplates;