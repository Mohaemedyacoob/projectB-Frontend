import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Upload, Calendar } from 'lucide-react';
import { mockBlogPosts } from '../../data/mockData';
import { BlogPost } from '../../types';
import toast from 'react-hot-toast';

const ManageBlogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    offerName: '',
    content: ''
  });

  const openModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        image: post.image,
        offerName: post.offerName,
        content: post.content || ''
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        image: '',
        offerName: '',
        content: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      // Update existing post
      const updatedPost: BlogPost = {
        ...editingPost,
        ...formData,
        createdAt: editingPost.createdAt
      };
      
      setBlogPosts(prev => prev.map(p => p.id === editingPost.id ? updatedPost : p));
      toast.success('📝 Blog post updated successfully!');
    } else {
      // Add new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date()
      };
      
      setBlogPosts(prev => [...prev, newPost]);
      toast.success('🎉 New blog post published!');
    }
    
    closeModal();
  };

  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts(prev => prev.filter(p => p.id !== postId));
      toast.success('🗑️ Blog post deleted!');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Manage Blog Posts</h1>
          <p className="text-gray-600 mt-2">Create and manage your blog content</p>
        </div>
        <motion.button
          onClick={() => openModal()}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-5 w-5" />
          <span>Add Blog Post</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full">
                <span className="text-sm font-bold">{post.offerName}</span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-bold text-black mb-2 line-clamp-2">
                {post.title}
              </h3>
              
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.createdAt.toLocaleDateString()}</span>
              </div>
              
              {post.content && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.content}
                </p>
              )}
              
              <div className="flex space-x-2">
                <motion.button
                  onClick={() => openModal(post)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(post.id)}
                  className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg font-medium hover:bg-red-200 transition-colors flex items-center justify-center space-x-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-black">
                  {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Enter blog title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Name
                  </label>
                  <input
                    type="text"
                    name="offerName"
                    value={formData.offerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="e.g., Weekend Special, Grand Opening"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    type="submit"
                    className="flex-1 bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Save className="h-5 w-5" />
                    <span>{editingPost ? 'Update' : 'Publish'} Post</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={closeModal}
                    className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageBlogs;