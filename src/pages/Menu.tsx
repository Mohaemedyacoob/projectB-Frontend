import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | Product['category']>('All');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const categories: Array<'All' | Product['category']> = ['All', 'Burger', 'Pizza', 'Juice'];

  const filterProducts = (category: 'All' | Product['category']) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredProducts(mockProducts);
    } else {
      setFilteredProducts(mockProducts.filter(product => product.category === category));
    }
  };

  const categoryColors = {
    Burger: 'bg-red-100 text-red-800',
    Pizza: 'bg-orange-100 text-orange-800',
    Juice: 'bg-green-100 text-green-800'
  };

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
            Our <span style={{ color: '#c57c2a' }}>Menu</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Discover our collection of signature burgers, authentic pizzas, and refreshing drinks
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mr-6">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => filterProducts(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-[#c57c2a] text-black shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${categoryColors[product.category]}`}>
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-black text-yellow-400 px-3 py-1 rounded-full">
                      <span className="text-lg font-bold">₹{product.price}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-black mb-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    {/* <motion.button
                      className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Add to Order
                    </motion.button> */}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl text-gray-500">
                No items found in this category
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;