import React from 'react';
import { Play, Clock, Star } from 'lucide-react';

const templates = [
  {
    id: 1,
    title: "Corporate Presentation",
    category: "Business",
    duration: "30s",
    rating: 4.8,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671176578_23932d0f.webp",
    description: "Professional business presentation style"
  },
  {
    id: 2,
    title: "Marketing Explainer",
    category: "Business",
    duration: "45s",
    rating: 4.9,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671178293_fe430be8.webp",
    description: "Engaging marketing video template"
  },
  {
    id: 3,
    title: "Product Demo",
    category: "Business",
    duration: "60s",
    rating: 4.7,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671180023_d826006f.webp",
    description: "Showcase your products effectively"
  },
  {
    id: 4,
    title: "Team Introduction",
    category: "Business",
    duration: "40s",
    rating: 4.6,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671181899_4400efbe.webp",
    description: "Introduce your team professionally"
  },
  {
    id: 5,
    title: "Social Media Post",
    category: "Social",
    duration: "15s",
    rating: 4.9,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671182627_b8df095b.webp",
    description: "Perfect for Instagram and TikTok"
  },
  {
    id: 6,
    title: "Story Highlight",
    category: "Social",
    duration: "20s",
    rating: 4.8,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671184388_35c2e5a7.webp",
    description: "Eye-catching story content"
  },
  {
    id: 7,
    title: "Promotional Video",
    category: "Social",
    duration: "30s",
    rating: 4.7,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671186130_84054df4.webp",
    description: "Promote your brand or event"
  },
  {
    id: 8,
    title: "Announcement",
    category: "Social",
    duration: "25s",
    rating: 4.8,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671187860_c1d8c411.webp",
    description: "Make important announcements"
  },
  {
    id: 9,
    title: "Educational Content",
    category: "Education",
    duration: "90s",
    rating: 4.9,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671193206_7e19a150.webp",
    description: "Perfect for online courses"
  },
  {
    id: 10,
    title: "Tutorial Video",
    category: "Education",
    duration: "120s",
    rating: 4.8,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671194965_b529d9bc.webp",
    description: "Step-by-step tutorials"
  },
  {
    id: 11,
    title: "Lesson Summary",
    category: "Education",
    duration: "60s",
    rating: 4.7,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671196701_15abad8c.webp",
    description: "Summarize key learning points"
  },
  {
    id: 12,
    title: "Quiz Introduction",
    category: "Education",
    duration: "45s",
    rating: 4.6,
    image: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671198465_a83a59e9.webp",
    description: "Introduce quizzes and assessments"
  }
];

const TemplateGrid: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
          <p className="text-xl text-gray-600">Start with professionally designed templates for every use case</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="relative">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                    <Play className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {template.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Clock className="h-3 w-3 text-white mr-1" />
                  <span className="text-white text-xs">{template.duration}</span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{template.rating}</span>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateGrid;