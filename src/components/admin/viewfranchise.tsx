// components/ContactLeadsPage.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getInterests, deleteInterest, } from '../../services/viewFranchise';
import { motion } from 'framer-motion';
import { CollaborationInterest } from '../../types/index';
import { Calendar, Phone, Mail, MessageSquare, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactLeadsPage = () => {
  const { user } = useAuth();
  const [interests, setInterests] = useState<CollaborationInterest[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInterest, setSelectedInterest] = useState<CollaborationInterest | null>(null);

  useEffect(() => {
    const fetchInterests = async () => {
      if (user) {
        setLoading(true);
        try {
          const token = localStorage.getItem('burger-mafia-token') || '';
          const response = await getInterests(currentPage, token);
          setInterests(response.data);
          setPagination(response.pagination);
        } catch (error) {
          console.error('Failed to fetch interests:', error);
          toast.error('Failed to load interests');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInterests();
  }, [currentPage, user]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this interest?')) {
      try {
        const token = localStorage.getItem('burger-mafia-token') || '';
        await deleteInterest(id, token);
        setInterests(prev => prev.filter(interest => interest.id !== id));
        toast.success('Interest deleted successfully');
        setSelectedInterest(null);
      } catch (error) {
        console.error('Delete failed:', error);
        toast.error('Failed to delete interest');
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Collaboration Interests</h1>
      </div>

      {interests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500">No Interests Found</h3>
          <p className="text-gray-400 mt-2">Customer inquiries will appear here when submitted.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Franchise Interest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {interests.map((interest) => (
                  <motion.tr 
                    key={interest.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {interest.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Mail className="h-4 w-4 mr-1 text-yellow-500" />
                            {interest.email || 'No email'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Phone className="h-4 w-4 mr-1 text-yellow-500" />
                        {interest.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {interest.franchise_interest ? 'Yes' : 'No'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-yellow-500" />
                        {new Date(interest.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedInterest(interest)}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="View details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(interest.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete interest"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.last_page > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * pagination.per_page + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pagination.per_page, pagination.total)}
                </span>{' '}
                of <span className="font-medium">{pagination.total}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.last_page}
                  className={`px-4 py-2 rounded-md ${currentPage === pagination.last_page ? 'bg-gray-200 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interest Detail View */}
      {selectedInterest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Interest Details</h2>
                <button
                  onClick={() => setSelectedInterest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedInterest.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedInterest.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedInterest.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Franchise Interest</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedInterest.franchise_interest ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date Received</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedInterest.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Message</h3>
                  <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedInterest.message}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setSelectedInterest(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleDelete(selectedInterest.id)}
                    className="px-4 py-2 bg-red-600 rounded-md text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete Interest
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactLeadsPage;