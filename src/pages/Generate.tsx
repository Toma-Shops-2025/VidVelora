import React from 'react';
import VideoGenerator from '@/components/VideoGenerator';

const Generate: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <VideoGenerator />
      </div>
    </div>
  );
};

export default Generate;
