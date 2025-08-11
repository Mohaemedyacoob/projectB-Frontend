import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Check, Shield, Truck, Clock, Heart } from 'lucide-react';
import { mockHeroBanner, mockBlogPosts, mockServices, mockTestimonials } from '../data/mockData';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${mockHeroBanner.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="absolute inset-0 bg-yellow-400 bg-opacity-10"></div>
        
        <motion.div
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {mockHeroBanner.title}
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 text-yellow-400 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {mockHeroBanner.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
           <Link
            to="/collaboration"
            style={{ backgroundColor: "#c57c2a", color: "#000" }}
            className="inline-flex items-center px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Franchise with Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          </motion.div>
        </motion.div>

        {/* Floating Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
     <section className="py-20 bg-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Our <span style={{ color: '#c57c2a' }}>Premium</span> Services
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        We go the extra mile to ensure your dining experience is exceptional
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {mockServices.map((service, index) => (
        <motion.div
          key={service.id}
          className="bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="text-yellow-500 mb-4">
            {service.icon === 'check' && <Check className="w-8 h-8" />}
            {service.icon === 'shield' && <Shield className="w-8 h-8" />}
           {service.icon === 'truck' && (
  <div className="w-8 h-8 relative mr-auto">
    <div className="absolute left-0 top-0 flex flex-col items-start">
      <div className="flex space-x-1 mb-0.5 ml-2.5">
        <div className="w-0.5 h-2 bg-yellow-300 rounded-full opacity-70 animate-[pulse_2s_infinite]"></div>
        <div className="w-0.5 h-1.5 bg-yellow-300 rounded-full opacity-70 animate-[pulse_2.5s_infinite]"></div>
      </div>
      <div className="relative">
        <div className="w-5 h-2.5 bg-yellow-400 rounded-t-full border border-yellow-500">
          <div className="absolute -left-1 -top-0.5 w-1.5 h-2 bg-yellow-300 rounded-l-full"></div>
          <div className="absolute -right-1 -top-0.5 w-1.5 h-2 bg-yellow-300 rounded-r-full"></div>
        </div>
        <div className="w-6 h-0.5 bg-yellow-600 mt-0.5 rounded-sm"></div>
      </div>
    </div>
  </div>
)}
            {service.icon === 'clock' && <Clock className="w-8 h-8" />}
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
          <p className="text-gray-300">{service.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Featured Blogs Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Latest from the <span className="text-[#c57c2a]">Family</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated with our latest offers, news, and mouth-watering content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockBlogPosts.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                    <Star className="w-4 h-4 inline mr-1" />
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.readTime} read</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-yellow-500 font-semibold mb-3">
                    {blog.offerName}
                  </p>
                  <p className="text-gray-300 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="inline-flex items-center text-white font-medium hover:text-yellow-400 transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              View All Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our <span className="text-[#c57c2a]">Family</span> Says
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-black p-8 rounded-xl shadow-md border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feedback Form */}
          <motion.div
            className="mt-20 bg-black rounded-xl shadow-xl overflow-hidden border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:flex">
              <div className="md:w-1/2 bg-[#c57c2a] p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-black mb-4">Share Your Experience</h3>
                <p className="text-black mb-6">
                  We value your feedback to help us improve and serve you better
                </p>
                <div className="flex items-center">
                  <Heart className="w-8 h-8 text-black mr-4" />
                  <span className="text-xl font-bold text-black">Thank You!</span>
                </div>
              </div>
              <div className="md:w-1/2 p-12 bg-black">
                <form>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="rating" className="block text-gray-300 font-medium mb-2">
                      Rating
                    </label>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <React.Fragment key={star}>
                          <input
                            type="radio"
                            id={`star${star}`}
                            name="rating"
                            value={star}
                            className="hidden"
                          />
                          <label
                            htmlFor={`star${star}`}
                            className="cursor-pointer text-gray-500 hover:text-yellow-400"
                          >
                            <Star className="w-8 h-8" />
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="feedback" className="block text-gray-300 font-medium mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      id="feedback"
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                      placeholder="Share your experience with us..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#c57c2a] text-black py-4 px-6 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-300"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the <span className="text-[#c57c2a]">Mafia</span> Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the best burgers, pizzas, and drinks in town. 
              Once you taste our food, you'll be part of the family forever.
            </p> */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="bg-[#c57c2a] text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
              >
                View Menu
              </Link>
              <Link
                to="/locations"
                className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Find a Location
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </Link>
            </div> */}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;