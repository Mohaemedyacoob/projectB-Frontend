import { Product, BlogPost, ContactLead, FranchiseLead, HeroBanner } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Mafia Boss Burger',
    price: 12.99,
    description: 'Double beef patty with special mafia sauce, aged cheddar, and crispy onions',
    category: 'Burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500',
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Capone\'s Pizza',
    price: 16.99,
    description: 'Loaded with pepperoni, Italian sausage, and mozzarella on our signature crust',
    category: 'Pizza',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Godfather Orange Juice',
    price: 4.99,
    description: 'Fresh squeezed orange juice with a hint of vanilla and ice',
    category: 'Juice',
    image: 'https://images.pexels.com/photos/161559/orange-juice-squeezed-refreshing-citrus-161559.jpeg?auto=compress&cs=tinysrgb&w=500',
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Scarface Spicy Burger',
    price: 13.99,
    description: 'Jalapeño-infused beef patty with pepper jack cheese and chipotle mayo',
    category: 'Burger',
    image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=500',
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'Don\'s Margherita',
    price: 14.99,
    description: 'Classic margherita with fresh basil, mozzarella, and San Marzano tomatoes',
    category: 'Pizza',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=500',
    createdAt: new Date()
  },
  {
    id: '6',
    name: 'Famiglia Berry Juice',
    price: 5.49,
    description: 'Mixed berry blend with strawberries, blueberries, and blackberries',
    category: 'Juice',
    image: 'https://images.pexels.com/photos/209540/pexels-photo-209540.jpeg?auto=compress&cs=tinysrgb&w=500',
    createdAt: new Date()
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'New Burger Mafia Location Opening Downtown!',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=500',
    offerName: 'Grand Opening Special',
    content: 'We are excited to announce our newest location opening in downtown...',
    createdAt: new Date()
  },
  {
    id: '2',
    title: '50% Off All Pizzas This Weekend',
    image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=500',
    offerName: 'Weekend Pizza Deal',
    content: 'Get ready for the ultimate pizza weekend...',
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Introducing Our Summer Juice Collection',
    image: 'https://images.pexels.com/photos/1337824/pexels-photo-1337824.jpeg?auto=compress&cs=tinysrgb&w=500',
    offerName: 'Summer Refreshers',
    content: 'Beat the heat with our new summer juice collection...',
    createdAt: new Date()
  },
  {
    id: '4',
    title: 'Behind the Scenes: How We Make Our Signature Burgers',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=500',
    offerName: 'Chef\'s Special',
    content: 'Take a look behind the curtain at our burger-making process...',
    createdAt: new Date()
  }
];

export const mockHeroBanner: HeroBanner = {
  id: '1',
  image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=1200',
  title: 'Welcome to the Burger Mafia',
  subtitle: 'Where every bite is an offer you can\'t refuse',
  createdAt: new Date()
};

export const mockContactLeads: ContactLead[] = [];
export const mockFranchiseLeads: FranchiseLead[] = [];