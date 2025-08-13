// services/leadsService.ts
import { ContactLead } from '../types';

interface PaginatedResponse<T> {
  status: boolean;
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
}
export const deleteLead = async (id: string, token: string): Promise<void> => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/admin/deletelead/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete lead');
    }
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
};

export const getContacts = async (page: number = 1, token: string): Promise<PaginatedResponse<ContactLead>> => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/admin/getleads?page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the API response to match your ContactLead interface
    const transformedData = data.data.map((lead: any) => ({
      id: lead.id.toString(),
      customerName: lead.customer_name,
      customerPhone: lead.customer_phone,
      email: lead.customer_email || undefined,
      message: lead.message,
      createdAt: new Date(lead.created_at)
    }));

    return {
      status: data.status,
      data: transformedData,
      pagination: data.pagination
    };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};