import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save, Eye, Trash2 } from 'lucide-react';
import { mockHeroBanner } from '../../data/mockData';
import { HeroBanner } from '../../types';
import toast from 'react-hot-toast';

const ManageBanner = () => {
  const [banner, setBanner] = useState<HeroBanner>(mockHeroBanner);
  const [formData, setFormData] = useState({
    image: banner.image,
    title: banner.title,
    subtitle: banner.subtitle
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedBanner: HeroBanner = {
      ...banner,
      ...formData,
      createdAt: new Date()
    };
    
    setBanner(updatedBanner);
    toast.success('🎯 Homepage banner updated successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to the original banner?')) {
      setFormData({
        image: mockHeroBanner.image,
        title: mockHeroBanner.title,
        subtitle: mockHeroBanner.subtitle
      });
      setBanner(mockHeroBanner);
      toast.success('🔄 Banner reset to original!');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Manage Homepage Banner</h1>
          <p className="text-gray-600 mt-2">Update the main hero section of your homepage</p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isPreviewMode 
                ? 'bg-gray-200 text-gray-700' 
                : 'bg-yellow-400 text-black hover:bg-yellow-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="h-4 w-4" />
            <span>{isPreviewMode ? 'Edit Mode' : 'Preview'}</span>
          </motion.button>
          
          <motion.button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 className="h-4 w-4" />
            <span>Reset</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Panel */}
        {!isPreviewMode && (
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-black mb-6">Banner Settings</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Background Image URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    title="Upload Image"
                  >
                    <Upload className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 1200x800px or larger
                </p>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Main Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Enter main title"
                />
              </div>

              <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <textarea
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                  placeholder="Enter subtitle"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="h-5 w-5" />
                <span>Update Banner</span>
              </motion.button>
            </form>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">Tips for Great Banners:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Use high-quality images that represent your brand</li>
                <li>• Keep titles short and impactful (3-6 words)</li>
                <li>• Make subtitles descriptive but concise</li>
                <li>• Test on different devices to ensure readability</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Preview Panel */}
        <motion.div
          className={`bg-white rounded-xl shadow-lg overflow-hidden ${isPreviewMode ? 'lg:col-span-2' : ''}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-black">Live Preview</h3>
            <p className="text-gray-600 text-sm mt-1">
              See how your banner will look on the homepage
            </p>
          </div>
          
          <div 
            className={`relative bg-cover bg-center ${isPreviewMode ? 'h-96' : 'h-64'} flex items-center justify-center`}
            style={{ backgroundImage: `url(${formData.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="absolute inset-0 bg-yellow-400 bg-opacity-20"></div>
            
            <div className="relative z-10 text-center text-white px-4">
              <h1 className={`font-bold mb-4 ${isPreviewMode ? 'text-4xl md:text-6xl' : 'text-2xl md:text-4xl'}`}>
                {formData.title}
              </h1>
              <p className={`text-yellow-400 font-medium ${isPreviewMode ? 'text-xl md:text-2xl' : 'text-lg'}`}>
                {formData.subtitle}
              </p>
              {isPreviewMode && (
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button className="bg-yellow-400 text-black px-8 py-3 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors">
                    Franchise with Us
                  </button>
                </motion.div>
              )}
            </div>
          </div>
          
          {!isPreviewMode && (
            <div className="p-6 bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Current Banner Image</span>
                <span>Last updated: {banner.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ManageBanner;