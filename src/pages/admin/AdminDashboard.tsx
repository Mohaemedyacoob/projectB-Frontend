import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, MessageSquare, Package, FileText, Image, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ManageProducts from '../../components/admin/ManageProducts';
import ManageBlogs from '../../components/admin/ManageBlogs';
import ViewLeads from '../../components/admin/ViewLeads';
import ViewFranchise from '../../components/admin/viewfranchise';
import ManageBanner from '../../components/admin/ManageBanner';
import toast from 'react-hot-toast';

type AdminSection = 'products' | 'blogs' | 'contact-leads' | 'franchise-leads' | 'banner';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('products');
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('👋 Logged out successfully!');
  };

  const menuItems = [
    { id: 'products' as AdminSection, label: 'Manage Products', icon: Package },
    { id: 'blogs' as AdminSection, label: 'Manage Blogs', icon: FileText },
    { id: 'contact-leads' as AdminSection, label: 'Contact Leads', icon: MessageSquare },
    { id: 'franchise-leads' as AdminSection, label: 'Franchise Leads', icon: Users },
    { id: 'banner' as AdminSection, label: 'Manage Banner', icon: Image }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return <ManageProducts />;
      case 'blogs':
        return <ManageBlogs />;
      case 'contact-leads':
        return <ViewLeads />;
      case 'franchise-leads':
        return <ViewFranchise/>;
      case 'banner':
        return <ManageBanner />;
      default:
        return <ManageProducts />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-bold tracking-tight">
                Burger <span className="text-yellow-400">Mafia</span> Admin
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Welcome, <strong>{user?.username}</strong>
              </span>
              <motion.button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg">
          <nav className="mt-8">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-yellow-400 text-black border-r-4 border-yellow-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-yellow-600'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;