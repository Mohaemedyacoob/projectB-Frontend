import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchBlogs } = useAuth();

  // Fetch blog posts from API
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetchBlogs();
        
        if (response) {
          setBlogPosts(response);
        } else {
          setError('Failed to fetch blog posts');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err.message || 'Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, [fetchBlogs]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Mafia <span style={{ color: '#c57c2a' }}>News</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Stay updated with the latest offers, news, and stories from the Burger Mafia family
          </motion.p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Blog Posts Yet</h3>
              <p className="text-gray-600">Check back later for the latest news and updates.</p>
            </div>
          ) : (
            <>
              {/* Grid layout with 3 columns on large screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={post.image || '/default-blog-image.jpg'}
                        alt={post.blog_name}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.src = '/default-blog-image.jpg';
                        }}
                      />
                      {post.offerName && (
                        <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full">
                          <span className="text-sm font-bold">{post.offerName}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-xl font-bold text-black mb-3 leading-tight">
                        {post.blog_name}
                      </h2>
                      
                      <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {post.created_at 
                              ? new Date(post.created_at).toLocaleDateString() 
                              : new Date().toLocaleDateString()
                            }
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>Burger Mafia</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed flex-grow">
                        {post.content || 'Read more to discover the full story...'}
                      </p>

                      <div className="mt-auto">
                        <motion.button
                          className="inline-flex items-center text-black font-medium hover:text-yellow-600 transition-colors group"
                          whileHover={{ x: 5 }}
                        >
                          Read Full Story
                          <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Load More Button */}
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.button
                  className="bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Load More Stories</span>
                  <span className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;