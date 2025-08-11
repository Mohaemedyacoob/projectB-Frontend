import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Removed Crown
import { motion, AnimatePresence } from 'framer-motion';
import BMLogo from '../Images/BM_logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-black text-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.img
              src={BMLogo}
              alt="Burger Mafia Logo"
              className="h-10 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="text-xl font-bold tracking-tight">
              <span style={{ color: '#7a2d14' }}>Burger</span> <span style={{ color: '#c57c2a' }}>Mafia</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
  {navItems.map((item) => (
    <Link
      key={item.path}
      to={item.path}
      className={`text-sm font-medium transition-colors duration-200 hover:text-[#c57c2a] relative ${
        location.pathname === item.path ? 'text-[#c57c2a]' : 'text-white'
      }`}
    >
      {item.label}
      {location.pathname === item.path && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#c57c2a]"
          layoutId="activeTab"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  ))}
</nav>

          {/* Mobile menu button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* Mobile Navigation */}
<AnimatePresence>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden bg-gray-900 border-t border-gray-800"
    >
      <nav className="px-4 py-2 space-y-1">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'text-[#c57c2a] bg-gray-800'
                  : 'text-white hover:text-[#c57c2a] hover:bg-gray-800'
              }`}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  )}
</AnimatePresence>

    </header>
  );
};

export default Header;
