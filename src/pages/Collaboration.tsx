import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Handshake, TrendingUp, Users, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import BMLogo from "../components/Images/BM_logo.png";

interface CollaborationFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  franchise_interest: boolean;
}

const Collaboration = () => {
  const [formData, setFormData] = useState<CollaborationFormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    franchise_interest: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (data.errors) {
          Object.values(data.errors).forEach((errorArray: any) => {
            errorArray.forEach((error: string) => {
              toast.error(error);
            });
          });
          return;
        }
        throw new Error(data.message || 'Failed to submit form');
      }

      toast.success(data.message || '🎯 Application received! Welcome to the family consideration process!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        franchise_interest: false
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Oops! Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Crown,
      title: 'Proven Business Model',
      description: 'Join a winning formula with 15+ years of success and thousands of satisfied customers.'
    },
    {
      icon: TrendingUp,
      title: 'High Profit Potential',
      description: 'Our franchisees see average returns of 25-30% with proper management and location.'
    },
    {
      icon: Users,
      title: 'Comprehensive Training',
      description: 'Complete training program covering operations, marketing, and customer service excellence.'
    },
    {
      icon: Handshake,
      title: 'Ongoing Support',
      description: 'Dedicated support team, marketing assistance, and regular business development consultations.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1200)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="absolute inset-0 bg-yellow-400 bg-opacity-10"></div>
        
        <motion.div
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <img
              src={BMLogo}
              alt="Burger Mafia Logo"
              className="h-20 w-20 mx-auto mb-4 object-contain"
            />
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-[#7a2d14]">Join the </span><span className="text-[#c57c2a]">Mafia</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Partner with us and become part of the most successful burger family
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <button 
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Start Your Journey
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Why Choose <span className="text-[#c57c2a]">Burger Mafia</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to build a successful and profitable franchise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 text-black rounded-full mb-6">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Ready to <span className="text-yellow-400">Get Started</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and our franchise team will contact you within 48 hours
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                    placeholder="+91"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about yourself and your interest *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-black rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300 resize-none"
                  placeholder="Previous business experience, preferred location, timeline, etc."
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="franchise_interest"
                  name="franchise_interest"
                  checked={formData.franchise_interest}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-yellow-400 border-2 border-gray-300 rounded focus:ring-yellow-400"
                />
                <label htmlFor="franchise_interest" className="text-gray-700 font-medium">
                  I'm seriously interested in franchise opportunities and have the required investment
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-yellow-400 text-black hover:bg-yellow-300 transform hover:scale-105'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Application</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Collaboration;