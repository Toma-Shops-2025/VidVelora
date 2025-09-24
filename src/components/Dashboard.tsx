import React from 'react';
import { Clock, Download, Eye, MoreVertical, Filter } from 'lucide-react';

const videoHistory = [
  {
    id: 1,
    title: "Product Launch Video",
    status: "completed",
    duration: "45s",
    created: "2 hours ago",
    thumbnail: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671176578_23932d0f.webp"
  },
  {
    id: 2,
    title: "Team Introduction",
    status: "processing",
    duration: "30s",
    created: "4 hours ago",
    thumbnail: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671178293_fe430be8.webp"
  },
  {
    id: 3,
    title: "Marketing Explainer",
    status: "completed",
    duration: "60s",
    created: "1 day ago",
    thumbnail: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671180023_d826006f.webp"
  },
  {
    id: 4,
    title: "Social Media Post",
    status: "completed",
    duration: "15s",
    created: "2 days ago",
    thumbnail: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671182627_b8df095b.webp"
  },
  {
    id: 5,
    title: "Tutorial Video",
    status: "completed",
    duration: "90s",
    created: "3 days ago",
    thumbnail: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671193206_7e19a150.webp"
  },
  {
    id: 6,
    title: "Company Update",
    status: "completed",
    duration: "40s",
    created: "1 week ago",
    thumbnail: "https://d64gsuwffb70l.cloudfront.net/68d3312090435df0c1b9b921_1758671194965_b529d9bc.webp"
  }
];

const Dashboard: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Videos</h2>
            <p className="text-gray-600">Manage and track all your generated videos</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-purple-500 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
              Create New Video
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {videoHistory.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  {video.status === 'processing' && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{video.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {video.duration}
                    </div>
                    <span>•</span>
                    <span>{video.created}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      video.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {video.status === 'completed' ? 'Ready' : 'Processing'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {video.status === 'completed' && (
                    <>
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Statistics</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
                <div className="text-gray-600">Videos Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">18m</div>
                <div className="text-gray-600">Total Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">76</div>
                <div className="text-gray-600">Credits Remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;