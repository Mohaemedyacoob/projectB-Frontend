import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLogging, setIsLogging] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogging(true);

    try {
      const success = await login(credentials.username, credentials.password);
      if (success) {
        toast.success('👑 Welcome back to the Mafia HQ!');
        navigate('/admin');
      } else {
        toast.error('Invalid credentials. Access denied!');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>
      
      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-full mb-4"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Crown className="h-10 w-10 text-yellow-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-black mb-2">
            Burger <span className="text-yellow-400">Mafia</span>
          </h1>
          <p className="text-gray-600">Admin Portal Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                placeholder="Enter password"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLogging}
            className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
              isLogging
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black text-yellow-400 hover:bg-gray-800 transform hover:scale-105'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isLogging ? (
              <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Enter the Family HQ</span>
            )}
          </motion.button>
        </form>

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Demo Credentials:</strong><br />
            Username: admin<br />
            Password: burgermafia123
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;