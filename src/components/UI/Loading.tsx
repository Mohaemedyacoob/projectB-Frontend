import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Crown className="h-16 w-16 text-yellow-400" />
        </motion.div>
        <motion.div
          className="text-white text-xl font-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Burger Mafia...
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loading;