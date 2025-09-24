import React, { useState } from 'react';
import { Type, Mic, Settings, Wand2 } from 'lucide-react';

const TextInput: React.FC = () => {
  const [text, setText] = useState('');
  const [style, setStyle] = useState('corporate');
  const [voice, setVoice] = useState('professional');

  const maxLength = 500;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Create Your Video</h2>
          <p className="text-xl text-gray-600">Enter your text and customize the style to generate your perfect video</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Text Input */}
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                  <Type className="h-5 w-5 mr-2 text-purple-600" />
                  Your Text
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter the text you want to convert to video..."
                  className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none"
                  maxLength={maxLength}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {text.length}/{maxLength} characters
                  </span>
                  <button className="text-purple-600 hover:text-purple-700 flex items-center text-sm">
                    <Mic className="h-4 w-4 mr-1" />
                    Voice Input
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  >
                    <option value="corporate">Corporate</option>
                    <option value="casual">Casual</option>
                    <option value="educational">Educational</option>
                    <option value="social">Social Media</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Voice Type</label>
                  <select
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="energetic">Energetic</option>
                    <option value="calm">Calm</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Preview & Generate */}
            <div className="space-y-6">
              <div className="bg-gray-100 rounded-xl p-6 h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wand2 className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-gray-600">Preview will appear here</p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  Generate Video
                </button>
                <button className="w-full border-2 border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-600 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Advanced Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextInput;