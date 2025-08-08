import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Phone, Mail, MessageSquare, Eye, Trash2, Filter, X } from 'lucide-react';
import { mockContactLeads, mockFranchiseLeads } from '../../data/mockData';
import { ContactLead, FranchiseLead } from '../../types';
import toast from 'react-hot-toast';

interface ViewLeadsProps {
  type: 'contact' | 'franchise';
}

const ViewLeads: React.FC<ViewLeadsProps> = ({ type }) => {
  const [contactLeads, setContactLeads] = useState<ContactLead[]>(mockContactLeads);
  const [franchiseLeads, setFranchiseLeads] = useState<FranchiseLead[]>(mockFranchiseLeads);
  const [selectedLead, setSelectedLead] = useState<ContactLead | FranchiseLead | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'recent'>('all');

  const leads = type === 'contact' ? contactLeads : franchiseLeads;
  const title = type === 'contact' ? 'Contact Leads' : 'Franchise Leads';
  
  React.useEffect(() => {
    if (type === 'contact' && contactLeads.length === 0) {
      const sampleContactLeads: ContactLead[] = [
        {
          id: '1',
          customerName: 'John Smith',
          customerPhone: '(555) 123-4567',
          email: 'john@email.com',
          message: 'I love your burgers! When will you open a location in downtown?',
          createdAt: new Date('2025-01-10')
        },
        {
          id: '2',
          customerName: 'Sarah Johnson',
          customerPhone: '(555) 987-6543',
          message: 'Had an amazing experience at your restaurant. The Mafia Boss Burger was incredible!',
          createdAt: new Date('2025-01-12')
        }
      ];
      setContactLeads(sampleContactLeads);
    }
    
    if (type === 'franchise' && franchiseLeads.length === 0) {
      const sampleFranchiseLeads: FranchiseLead[] = [
        {
          id: '1',
          name: 'Michael Brown',
          phone: '(555) 456-7890',
          email: 'michael@business.com',
          message: 'I have 15 years of restaurant management experience and am interested in opening a Burger Mafia franchise in Austin, Texas. I have the required capital and a prime location in mind.',
          franchiseInterest: true,
          createdAt: new Date('2025-01-08')
        },
        {
          id: '2',
          name: 'Lisa Rodriguez',
          phone: '(555) 321-0987',
          email: 'lisa.rodriguez@gmail.com',
          message: 'Looking to expand my food service portfolio. Currently own 2 successful restaurants and want to discuss franchise opportunities.',
          franchiseInterest: true,
          createdAt: new Date('2025-01-11')
        }
      ];
      setFranchiseLeads(sampleFranchiseLeads);
    }
  }, [type, contactLeads.length, franchiseLeads.length]);

  const handleDelete = (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      if (type === 'contact') {
        setContactLeads(prev => prev.filter(lead => lead.id !== leadId));
      } else {
        setFranchiseLeads(prev => prev.filter(lead => lead.id !== leadId));
      }
      toast.success('🗑️ Lead deleted successfully!');
      setSelectedLead(null);
    }
  };

  const filteredLeads = filterStatus === 'recent' 
    ? leads.filter(lead => {
        const daysDiff = (Date.now() - lead.createdAt.getTime()) / (1000 * 3600 * 24);
        return daysDiff <= 7;
      })
    : leads;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">{title}</h1>
          <p className="text-gray-600 mt-2">
            {type === 'contact' ? 'Customer inquiries and feedback' : 'Franchise partnership applications'}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'recent')}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="all">All Leads</option>
            <option value="recent">Recent (7 days)</option>
          </select>
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">No Leads Yet</h3>
          <p className="text-gray-400">
            {type === 'contact' 
              ? 'Customer inquiries will appear here when they contact you.'
              : 'Franchise applications will appear here when submitted.'
            }
          </p>
        </motion.div>
      ) : (
        <div className={`grid ${selectedLead ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          <div className={`${selectedLead ? 'lg:col-span-2' : 'col-span-1'}`}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      {type === 'franchise' && (
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Interest
                        </th>
                      )}
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLeads.map((lead) => (
                      <motion.tr 
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {type === 'contact' 
                                  ? (lead as ContactLead).customerName 
                                  : (lead as FranchiseLead).name}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <Mail className="h-4 w-4 mr-1 text-yellow-500" />
                                {type === 'contact' 
                                  ? (lead as ContactLead).email || 'No email'
                                  : (lead as FranchiseLead).email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-yellow-500" />
                            {type === 'contact' 
                              ? (lead as ContactLead).customerPhone 
                              : (lead as FranchiseLead).phone}
                          </div>
                        </td>
                        {type === 'franchise' && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              (lead as FranchiseLead).franchiseInterest
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {(lead as FranchiseLead).franchiseInterest ? 'High' : 'Normal'}
                            </span>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-yellow-500" />
                            {lead.createdAt.toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLead(lead);
                              }}
                              className="text-yellow-600 hover:text-yellow-800"
                              title="View details"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(lead.id);
                              }}
                              className="text-red-500 hover:text-red-700"
                              title="Delete lead"
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
            </div>
          </div>

          <AnimatePresence>
            {selectedLead && (
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-black">Lead Details</h2>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                      title="Close details"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        {type === 'contact' 
                          ? (selectedLead as ContactLead).customerName 
                          : (selectedLead as FranchiseLead).name}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        {type === 'contact' 
                          ? (selectedLead as ContactLead).customerPhone 
                          : (selectedLead as FranchiseLead).phone}
                      </div>
                    </div>

                    {((type === 'contact' && (selectedLead as ContactLead).email) || type === 'franchise') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          {type === 'contact' 
                            ? (selectedLead as ContactLead).email || 'Not provided'
                            : (selectedLead as FranchiseLead).email}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <div className="bg-gray-50 p-3 rounded-lg min-h-[100px] whitespace-pre-wrap">
                        {selectedLead.message}
                      </div>
                    </div>

                    {type === 'franchise' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Franchise Interest</label>
                        <div className={`p-3 rounded-lg ${
                          (selectedLead as FranchiseLead).franchiseInterest 
                            ? 'bg-green-50 text-green-800' 
                            : 'bg-gray-50'
                        }`}>
                          {(selectedLead as FranchiseLead).franchiseInterest ? 'High Interest' : 'General Inquiry'}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Received</label>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        {selectedLead.createdAt.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button className="flex-1 bg-yellow-400 text-black py-2 px-4 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                        Contact Lead
                      </button>
                      <button 
                        onClick={() => handleDelete(selectedLead.id)}
                        className="px-6 bg-red-100 text-red-700 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ViewLeads;