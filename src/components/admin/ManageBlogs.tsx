import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Upload, Calendar } from 'lucide-react';
import { BlogPost } from '../../types';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const ManageBlogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    blog_name: '',
    image: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fetchBlogs, createBlog, updateBlog, deleteBlog } = useAuth();

  // Fetch blogs on component mount
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetchBlogs();
      if (response) {
        setBlogPosts(response);
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        blog_name: post.blog_name,
        image: post.image || ''
      });
      setImageFile(null);
    } else {
      setEditingPost(null);
      setFormData({
        blog_name: '',
        image: ''
      });
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
    setImageFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (max 2MB as per backend)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      
      // Store the file for later submission
      setImageFile(file);
      
      toast.success('Image selected successfully!');
    } catch (error) {
      toast.error('Failed to process image');
      console.error('Image processing error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.blog_name) {
      toast.error('Blog name is required');
      return;
    }

    if (!editingPost && !imageFile) {
      toast.error('Image is required for new blog posts');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (editingPost) {
        // Update existing post
        const success = await updateBlog(editingPost.id.toString(), {
          blog_name: formData.blog_name,
          imageFile: imageFile || undefined
        });
        
        if (success) {
          toast.success('✅ Blog post updated successfully!');
          closeModal();
          loadBlogs();
        }
      } else {
        // Add new post
        const success = await createBlog({
          blog_name: formData.blog_name,
          imageFile: imageFile!
        });
        
        if (success) {
          toast.success('🎉 New blog post created successfully!');
          closeModal();
          loadBlogs();
        }
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const success = await deleteBlog(postId);
        if (success) {
          toast.success('🗑️ Blog post deleted!');
          loadBlogs();
        } else {
          toast.error('Failed to delete blog post');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Failed to delete blog post');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Blog Posts</h1>
          <p className="text-gray-600 mt-2">Create and manage your blog content</p>
        </div>
        <motion.button
          onClick={() => openModal()}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-colors flex items-center space-x-2 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-5 w-5" />
          <span>Add Blog Post</span>
        </motion.button>
      </div>

      {blogPosts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-500">No Image</span>
          </div>
          <p className="text-gray-600">No blog posts yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {post.image ? (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.blog_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center hidden">
                    <span className="text-gray-500">Image Not Displayed</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {post.blog_name}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                
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
                    onClick={() => handleDelete(post.id.toString())}
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
      )}

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
                <h2 className="text-2xl font-bold text-gray-800">
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
                    Blog Name
                  </label>
                  <input
                    type="text"
                    name="blog_name"
                    value={formData.blog_name}
                    onChange={handleInputChange}
                    required
                    maxLength={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Enter blog name (max 20 characters)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image {!editingPost && '*'}
                  </label>
                  <div className="flex flex-col space-y-4">
                    <div className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                      {imagePreview || (editingPost && editingPost.image) ? (
                        <img 
                          src={imagePreview || editingPost?.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="h-10 w-10 mx-auto text-gray-400" />
                          <p className="text-gray-500 mt-2">Upload an image</p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                      />
                      <motion.button
                        type="button"
                        onClick={triggerFileInput}
                        className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isUploading}
                      >
                        <Upload className="h-4 w-4" />
                        <span>{isUploading ? 'Uploading...' : 'Select Image'}</span>
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPEG, PNG, JPG, WEBP. Max size: 2MB
                  </p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    type="submit"
                    className="flex-1 bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting || isUploading}
                  >
                    <Save className="h-5 w-5" />
                    <span>
                      {isSubmitting ? 'Saving...' : (editingPost ? 'Update' : 'Create')} Post
                    </span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={closeModal}
                    className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
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