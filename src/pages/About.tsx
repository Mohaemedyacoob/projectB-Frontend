import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Clock, Heart } from 'lucide-react';
import BMLogo from '../components/Images/BM_logo.png';


const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
    { icon: Clock, label: 'Years Experience', value: '15+' },
    { icon: Heart, label: 'Family Members', value: '500+' }
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We use only the finest ingredients sourced from trusted suppliers to ensure every bite is perfection.',
      icon: '🥇'
    },
    {
      title: 'Family Values',
      description: 'Every customer becomes part of our extended family, treated with respect, care, and warmth.',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Innovation',
      description: 'We constantly evolve our recipes and cooking techniques to bring you exciting new flavors.',
      icon: '💡'
    },
    {
      title: 'Community',
      description: 'We give back to our community and support local businesses whenever possible.',
      icon: '🌟'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax */}
      <section 
        className="relative  h-[70vh]  flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1200)'
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
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our <span style={{ color: '#c57c2a' }}>Story</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Where passion meets flavor, and every meal tells a story
          </motion.p>
        </motion.div>

        {/* Floating burger emoji */}
        <motion.div
          className="absolute bottom-20 right-10 text-6xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🍔
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 text-black rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="h-8 w-8" />
                </motion.div>
                <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                The <span style={{ color: '#c57c2a' }}>Family</span> Begins
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                It all started with a simple dream — to serve Bengaluru the kind of burgers you can’t forget. 
                In the heart of KR Puram, Burger Mafia fired up its grills and began crafting 
                juicy, flavor-packed creations that would soon become the talk of the town.
              </p>
              <p>
                With recipes perfected through passion, a dash of quirk, and only the freshest ingredients, 
                we went from serving a handful of curious foodies to becoming the go-to spot 
                for burger lovers, pizza fans, and snack hunters alike.
              </p>
              <p>
                Today, Burger Mafia is more than just a place to eat — it’s a family. 
                Every burger we flip, every pizza we bake, and every drink we blend 
                carries the same love, energy, and flavor that started it all.
              </p>
              <p>
                Because here, it’s not just food — it’s <strong>burger justice</strong>. 🍔🔥
              </p>

              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/280453/pexels-photo-280453.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our kitchen"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl"
                style={{ backgroundColor: '#f4e1c1  ' }}
              >
                <motion.img
                  src={BMLogo}
                  alt="Burger Mafia Logo"
                  className="h-10 w-auto"
                  whileHover={{ scale: 2.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Our <span style={{ color: '#c57c2a' }}>Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing ingredients to serving our customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-black mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet the <span style={{ color: '#c57c2a' }}>Family</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The talented individuals who make the magic happen every single day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Tony Marinelli', role: 'Founder & Head Chef', image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { name: 'Maria Rossi', role: 'Operations Manager', image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { name: 'Giuseppe Leone', role: 'Pizza Maestro', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300' }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-yellow-400 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">{member.name}</h3>
                <p className="text-gray-300 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
