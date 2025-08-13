import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contact', formData);

      if (response.data.status) {
        toast.success('🍔 Message sent! The family will get back to you soon!');
        setFormData({
          customer_name: '',
          customer_phone: '',
          customer_email: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle validation errors from Laravel
        if (error.response.status === 422 && error.response.data.errors) {
          const errors = error.response.data.errors;
          Object.keys(errors).forEach(key => {
            toast.error(errors[key][0]);
          });
        } else {
          toast.error(error.response.data.message || 'Oops! Something went wrong. Please try again.');
        }
      } else {
        toast.error('Oops! Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call the Family',
      details: '+91 89714 44404',
      description: 'Mon-Sun: 10 AM - 6 PM'
    },
    {
      icon: Mail,
      title: 'Send a Message',
      details: 'info@burgermafia.com',
      description: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Visit Our HQ',
      details: '48, Ground Floor, Gokul Mansion, Ayyappanagar, Hoodi Main Road, KR Puram, Bengaluru, Karnataka',
      description: 'Come see where the magic happens'
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      details: 'Mon-Sun: 10 AM - 11 PM',
      description: 'Always ready to serve'
    }
  ];

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
            <span className="text-[#7a2d14]">Contact the </span><span className="text-[#c57c2a]">Family</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Got questions, feedback, or just want to say hello? We're here to listen.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-black mb-6">
              Send us a <span className="text-[#c57c2a]">Message</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:text-[#c57c2a] focus:ring-0 transition-colors duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="customer_phone"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                  placeholder="+91 "
                />
              </div>

              <div>
                <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="customer_email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300 resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#c57c2a] text-white hover:bg-[#d8903c] transform hover:scale-105'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">
                Get in <span className="text-[#c57c2a]">Touch</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Whether you have a question about our menu, want to make a reservation, 
                or just want to share your experience, we'd love to hear from you.
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#c57c2a] text-black rounded-full flex items-center justify-center">
                      <info.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-1">{info.title}</h3>
                    <p className="text-gray-900 font-medium mb-1">{info.details}</p>
                    <p className="text-gray-600">{info.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Burger Emoji */}
      <motion.div
        className="fixed bottom-8 right-8 text-6xl cursor-pointer z-10"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.2 }}
        onClick={() => toast('🍔 Hungry? Check out our menu!')}
      >
        🍔
      </motion.div>
    </div>
  );
};

export default Contact;