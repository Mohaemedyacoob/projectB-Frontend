export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Pizza' | 'Burger' | 'Juice';
  image: string;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  blog_name: string;
  image: string;
  created_at: string;  // Changed from createdAt to created_at
  updated_at?: string;
}

export interface ContactLead {
  id: string;
  customerName: string;
  customerPhone: string;
  email?: string;
  message: string;
  createdAt: Date;
}

export interface FranchiseLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  franchiseInterest: boolean;
  createdAt: Date;
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

