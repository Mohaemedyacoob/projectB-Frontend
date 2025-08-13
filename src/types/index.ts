export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'burger' | 'pizza' | 'juice'; // lowercase
  image: string;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  blog_name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ContactLead {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  message: string;
  createdAt: Date;
}

export interface CollaborationInterest {
  id: string;
  name: string;          // Changed from customerName
  phone: string;         // Changed from customerPhone
  email: string;
  message: string;
  franchise_interest: boolean;  // Added this
  created_at: string;    // Changed from createdAt (Date)
}

export interface HeroBanner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  role: 'admin';
}

