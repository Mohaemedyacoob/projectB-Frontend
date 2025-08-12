import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, User,BlogPost } from '../types';
import toast from 'react-hot-toast';


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  fetchProducts: () => Promise<Product[] | null>;
  createProduct: (data: Omit<Product, 'id' | 'createdAt'>) => Promise<boolean>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  updateProductCustom: (id: string, data: Partial<Product>) => Promise<boolean>;
  // Add blog-related functions
  fetchBlogs: () => Promise<BlogPost[] | null>;
  createBlog: (data: { blog_name: string; imageFile: File }) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE = 'http://127.0.0.1:8000/api/admin/products';
  const API_BASE_BLOG = 'http://127.0.0.1:8000/api/admin/blogs';

  // Improved headers function that checks for token existence
  const getAuthHeaders = (): { headers: HeadersInit } => {
    const token = localStorage.getItem('burger-mafia-token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
  };

  // Enhanced API request handler with token refresh
  const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    try {
      // First attempt with current token
      const { headers } = getAuthHeaders();
      let response = await fetch(url, { ...options, headers });

      // If unauthorized, try refreshing token
      if (response.status === 401) {
        const refreshResponse = await fetch('http://127.0.0.1:8000/api/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: localStorage.getItem('burger-mafia-token') }),
        });

        if (refreshResponse.ok) {
          const { token: newToken } = await refreshResponse.json();
          localStorage.setItem('burger-mafia-token', newToken);
          
          // Retry with new token
          const newHeaders = {
            ...headers,
            'Authorization': `Bearer ${newToken}`
          };
          response = await fetch(url, { ...options, headers: newHeaders });
        } else {
          // Refresh failed - clear token and user
          localStorage.removeItem('burger-mafia-token');
          setUser(null);
          throw new Error('Session expired. Please login again.');
        }
      }

      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  // Verify token & fetch user on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('burger-mafia-token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await authFetch('http://127.0.0.1:8000/api/user');
        if (!response.ok) throw new Error('Token verification failed');

        const userData = await response.json();
        setUser({
          id: userData.id,
          username: userData.name,
          role: 'admin',
        });
      } catch (error) {
        console.error('Token verification error:', error);
        localStorage.removeItem('burger-mafia-token');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      const { token } = await response.json();
      localStorage.setItem('burger-mafia-token', token);

      // Fetch user data with new token
      const userResponse = await authFetch('http://127.0.0.1:8000/api/user');
      const userData = await userResponse.json();
      
      setUser({ 
        id: userData.id, 
        username: userData.name, 
        role: 'admin' 
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authFetch('http://127.0.0.1:8000/api/admin/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('burger-mafia-token');
      setUser(null);
    }
  };

  // Product API calls with improved error handling
  const fetchProducts = async (): Promise<Product[] | null> => {
    try {
      const response = await authFetch(API_BASE);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Fetch products error:', error);
      return null;
    }
  };

  const createProduct = async (data: Omit<Product, 'id' | 'createdAt'> & { imageFile?: File }): Promise<boolean> => {
  try {
    const formData = new FormData();
    
    // Append all fields properly
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('description', data.description);
    formData.append('category', data.category.toLowerCase()); // Ensure lowercase
    
    // Handle image file
    if (data.imageFile) {
      formData.append('image', data.imageFile);
    } else if (data.image.startsWith('blob:')) {
      // Convert blob URL to file
      const response = await fetch(data.image);
      const blob = await response.blob();
      const file = new File([blob], 'product-image.jpg', { type: blob.type });
      formData.append('image', file);
    }

    const response = await authFetch(`${API_BASE}`, {
      method: 'POST',
      body: formData // Let browser set Content-Type
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Create product failed:', errorData);
      
      // Show all validation errors
      if (errorData.error) {
        Object.entries(errorData.error).forEach(([field, errors]) => {
          if (Array.isArray(errors)) {
            errors.forEach(error => toast.error(`${field}: ${error}`));
          }
        });
      }
      return false;
    }

    return true;
  } catch (error) {
    console.error('Create product error:', error);
    toast.error('Failed to create product');
    return false;
  }
};

  const updateProduct = async (id: string, data: Partial<Product>): Promise<boolean> => {
    try {
      const response = await authFetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (error) {
      console.error('Update product error:', error);
      return false;
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      const response = await authFetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Delete product error:', error);
      return false;
    }
  };

  const updateProductCustom = async (id: string, data: Partial<Product>): Promise<boolean> => {
    try {
      const response = await authFetch(`http://127.0.0.1:8000/api/admin/updateproduct/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.ok;
    } catch (error) {
      console.error('Custom update product error:', error);
      return false;
    }
  };

const fetchBlogs = async (): Promise<BlogPost[] | null> => {
  try {
    const response = await authFetch(API_BASE_BLOG);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    const data = await response.json();
    console.log(data);
    // Transform the data to match your interface
    return data.map((blog: any) => ({
      ...blog,
      created_at: blog.created_at // Map created_at to createdAt
    }));
  } catch (error) {
    console.error('Fetch blogs error:', error);
    return null;
  }
};

const createBlog = async (data: { blog_name: string; imageFile: File }): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('blog_name', data.blog_name);
    formData.append('image', data.imageFile);

    const response = await authFetch(API_BASE_BLOG, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Create blog failed:', errorData);
      
      if (errorData.error) {
        Object.entries(errorData.error).forEach(([field, errors]) => {
          if (Array.isArray(errors)) {
            errors.forEach(error => toast.error(`${field}: ${error}`));
          }
        });
      }
      return false;
    }

    return true;
  } catch (error) {
    console.error('Create blog error:', error);
    toast.error('Network error while creating blog');
    return false;
  }
};

const deleteBlog = async (id: string): Promise<boolean> => {
  try {
    const response = await authFetch(`${API_BASE_BLOG}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Delete blog error:', error);
    return false;
  }
};


  return (
    <AuthContext.Provider
       value={{
        user,
        login,
        logout,
        isLoading,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        updateProductCustom,
        fetchBlogs,
        createBlog,
        deleteBlog,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};