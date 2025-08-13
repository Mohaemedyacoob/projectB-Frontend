import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api/admin';
import { CollaborationInterest } from '../types';

export interface PaginatedResponse {
  data: CollaborationInterest[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
}

export const getInterests = async (page: number = 1, token: string): Promise<PaginatedResponse> => {
  try {
    const response = await axios.get(`${API_URL}/interests`, {
      params: { page },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    
    return {
      data: response.data.data,
      pagination: {
        current_page: response.data.current_page,
        per_page: response.data.per_page,
        total: response.data.total,
        last_page: response.data.last_page,
        next_page_url: response.data.next_page_url,
        prev_page_url: response.data.prev_page_url
      }
    };
  } catch (error) {
    console.error('Error fetching interests:', error);
    throw error;
  }
};

export const deleteInterest = async (id: string, token: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/interests/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error deleting interest:', error);
    throw error;
  }
};