import React, { useState } from 'react';
import { Play, Download, Share2, Clock, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { VideoService } from '@/lib/videoService';
import { toast } from '@/components/ui/use-toast';

interface GeneratedVideo {
  id: string;
  prompt: string;
  thumbnail: string;
  duration: string;
  status: 'generating' | 'completed' | 'failed';
  progress?: number;
}

const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const { user } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim() || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to generate videos.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const response = await VideoService.generateVideo({
        prompt,
        duration: 60, // 1 minute default
        style: 'professional'
      }, user.id);

      const newVideo: GeneratedVideo = {
        id: response.id,
        prompt,
        thumbnail: 'https://d64gsuwffb70l.cloudfront.net/68d353f7219af5c54a6ed682_1758680186261_09e95541.webp',
        duration: '0:00',
        status: response.status,
        progress: response.progress
      };
      
      setVideos(prev => [newVideo, ...prev]);
      setPrompt('');
      
      toast({
        title: "Video Generation Started",
        description: "Your video is being created. You'll be notified when it's ready!",
      });

      // Poll for updates
      const pollInterval = setInterval(async () => {
        try {
          const userVideos = await VideoService.getUserVideos(user.id);
          const updatedVideo = userVideos.find(v => v.id === response.id);
          
          if (updatedVideo) {
            setVideos(prev => prev.map(v => 
              v.id === updatedVideo.id 
                ? { 
                    ...v, 
                    status: updatedVideo.status, 
                    progress: updatedVideo.progress,
                    duration: updatedVideo.duration ? `${Math.floor(updatedVideo.duration / 60)}:${(updatedVideo.duration % 60).toString().padStart(2, '0')}` : '0:00'
                  } 
                : v
            ));
            
            if (updatedVideo.status === 'completed' || updatedVideo.status === 'failed') {
              clearInterval(pollInterval);
              setIsGenerating(false);
              
              if (updatedVideo.status === 'completed') {
                toast({
                  title: "Video Ready!",
                  description: "Your video has been successfully generated.",
                });
              } else {
                toast({
                  title: "Generation Failed",
                  description: "There was an error generating your video. Please try again.",
                  variant: "destructive",
                });
              }
            }
          }
        } catch (error) {
          console.error('Error polling video status:', error);
        }
      }, 2000);

      // Cleanup after 5 minutes
      setTimeout(() => clearInterval(pollInterval), 300000);
      
    } catch (error) {
      console.error('Error generating video:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your video. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI Video Generator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your ideas into professional videos with our advanced AI technology
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to create..."
                className="w-full h-24 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none"
                maxLength={500}
              />
            </div>
            <div className="flex flex-col justify-center">
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Video'}
              </button>
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.prompt}
                  className="w-full h-48 object-cover"
                />
                {video.status === 'generating' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p className="text-sm">{Math.round(video.progress || 0)}%</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-800 text-sm mb-3 line-clamp-2">
                  {video.prompt}
                </p>
                
                {video.status === 'completed' && (
                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGenerator;