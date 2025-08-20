import React, { useState, useRef, useMemo, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Upload, Search } from 'lucide-react';
import { Product } from '../../types';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

type Category = 'burger' | 'pizza' | 'juice';

interface ProductFormData extends Omit<Product, 'id' | 'createdAt'> {
  imageFile?: File;
}

const PRODUCTS_PER_PAGE = 6;

// Price formatting utility function
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price);
};

const ManageProducts = () => {
  const { fetchProducts, createProduct, updateProduct, deleteProduct } = useAuth();
  
  // State management
  const [formData, setFormData] = useState<ProductFormData>({
  name: '',
  price: 0,
  description: '',
  category: 'Burger', // lowercase
  image: '',
  imageFile: undefined
});
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetchProducts();
      console.log('API Response:', response);
      
      // Handle both cases: direct array or object with data property
      let productsArray: Product[];
      if (Array.isArray(response)) {
        productsArray = response;
      } else if (response && Array.isArray(response.data)) {
        productsArray = response.data;
      } else {
        console.warn('Unexpected API response format:', response);
        setProducts([]);
        throw new Error('Invalid products data format');
      }
      
      setProducts(productsArray);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  loadProducts();
}, [fetchProducts]);


  // Memoized filtered products
  const filteredProducts = useMemo(() => {
  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];
  
  return safeProducts.filter(product => {
    // Skip invalid products
    if (!product || typeof product !== 'object') return false;
    
    // Provide defaults for required fields
    const name = String(product.name || '');
    const description = String(product.description || '');
    const category = String(product.category || '').toLowerCase();
    
    const searchTermLower = String(searchTerm || '').toLowerCase();
    const matchesSearch = name.toLowerCase().includes(searchTermLower) || 
                        description.toLowerCase().includes(searchTermLower);
    
    // Handle case-insensitive category comparison
    // In your filtering logic:
  const matchesCategory = categoryFilter 
    ? product.category.toLowerCase() === categoryFilter.toLowerCase()
    : true;
    
    return matchesSearch && matchesCategory;
  });
}, [products, searchTerm, categoryFilter]);

  // Pagination calculations
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Category colors mapping
  const categoryColors = {
    Burger: 'bg-red-100 text-red-800',
    Pizza: 'bg-orange-100 text-orange-800',
    Juice: 'bg-green-100 text-green-800'
  };

  // Modal handlers
  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        description: '',
        category: 'burger',
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    toast.error('Please upload a JPEG, PNG, or JPG image');
    return;
  }

  // Validate file size (2MB max)
  if (file.size > 2 * 1024 * 1024) {
    toast.error('Image size should be less than 2MB');
    return;
  }

  setIsUploading(true);

  try {
    // Create preview URL and store file
    const previewUrl = URL.createObjectURL(file);
    
    setFormData(prev => ({
      ...prev,
      image: previewUrl,
      imageFile: file // Store the actual file object
    }));
    
    toast.success('Image selected successfully!');
  } catch (error) {
    toast.error('Failed to process image');
    console.error('Upload error:', error);
  } finally {
    setIsUploading(false);
  }
};

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Form validation
  const validateForm = () => {
  const validCategories = ['burger', 'pizza', 'juice'];
  if (!validCategories.includes(formData.category.toLowerCase())) {
    toast.error('Invalid category selected');
    return false;
  }
    const errors = [];
    if (!formData.name.trim()) errors.push('Name is required');
    if (formData.price <= 0) errors.push('Price must be positive');
    if (!formData.description.trim()) errors.push('Description is required');
    if (!formData.image) errors.push('Image is required');
    
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }
    return true;
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (editingProduct) {
        // Update existing product
        const success = await updateProduct(editingProduct.id, formData);
        if (success) {
          const updatedProducts = await fetchProducts();
          setProducts(updatedProducts);
          toast.success('🍔 Product updated successfully!');
          closeModal();
        }
      } else {
        // Add new product
        const success = await createProduct({
          ...formData,
          price: Number(formData.price) // Ensure price is a number
        });
        console.log('Sending product data:', {
          ...formData,
          price: Number(formData.price)
        });
        
        if (success) {
          const updatedProducts = await fetchProducts();
          setProducts(updatedProducts);
          toast.success('🎉 New product added to the menu!');
          closeModal();
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('An error occurred while saving the product');
    }
  };

  // Product actions
  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to remove this item from the menu?')) {
      try {
        const success = await deleteProduct(productId);
        if (success) {
          // Refresh products after deletion
          const updatedProducts = await fetchProducts();
          if (updatedProducts) {
            setProducts(updatedProducts);
            toast.success('🗑️ Product removed from menu!');
            
            // Reset to first page if current page becomes empty
            if (currentProducts.length === 1 && currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }
        } else {
          toast.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('An error occurred while deleting the product');
      }
    }
  };

  // Memoized product card component
  const ProductCard = React.memo(({ product, onEdit, onDelete }: {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
  }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${categoryColors[product.category]}`}>
            {product.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-black text-yellow-400 px-3 py-1 rounded-full">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{product.description}</p>
        
        <div className="flex space-x-2">
          <motion.button
            onClick={() => onEdit(product)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Edit ${product.name}`}
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </motion.button>
          <motion.button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg font-medium hover:bg-red-200 transition-colors flex items-center justify-center space-x-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Delete ${product.name}`}
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  ));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Manage Products</h1>
          <p className="text-gray-600 mt-2">Add, edit, and manage your menu items</p>
        </div>
        
        <motion.button
          onClick={() => openModal()}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Add new product"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          <span>Add Product</span>
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            aria-label="Search products"
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          value={categoryFilter || ''}
          onChange={(e) => {
            setCategoryFilter(e.target.value as Category | null);
            setCurrentPage(1); // Reset to first page on filter change
          }}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          <option value="Burger">Burgers</option>
          <option value="Pizza">Pizza</option>
          <option value="Juice">Juice</option>
        </select>
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={openModal}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg disabled:opacity-50"
                  aria-label="Previous page"
                >
                  &lt;
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-1 rounded-full mx-1 ${
                      currentPage === i + 1 ? 'bg-yellow-400 text-black font-bold' : 'bg-gray-200'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg disabled:opacity-50"
                  aria-label="Next page"
                >
                  &gt;
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No products found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 id="modal-title" className="text-2xl font-bold text-black">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Enter product name"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="product-price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    id="product-price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="0.00"
                    aria-required="true"
                  />
                  {formData.price > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Displayed as: {formatPrice(formData.price)}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="product-category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                <select
                  id="product-category"
                  name="category"
                  value={formData.category.toLowerCase()} // Convert to lowercase
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  aria-required="true"
                >
                  <option value="burger">Burger</option>
                  <option value="pizza">Pizza</option>
                  <option value="juice">Juice</option>
                </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="flex flex-col space-y-4">
                    <div className="relative group">
                      <div 
                        className={`w-full h-48 rounded-lg border-2 border-dashed ${
                          formData.image ? 'border-transparent' : 'border-gray-300'
                        } overflow-hidden bg-gray-100 flex items-center justify-center`}
                      >
                        {formData.image ? (
                          <img 
                            src={formData.image} 
                            alt="Current product" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <Upload className="h-10 w-10 mx-auto text-gray-400" />
                            <p className="text-gray-500 mt-2">No image selected</p>
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black bg-opacity-50 rounded-lg p-2">
                          <p className="text-white text-sm">Click to change image</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        aria-label="Upload product image"
                      />
                      <motion.button
                        type="button"
                        onClick={triggerFileInput}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isUploading}
                        aria-label="Upload product image"
                      >
                        <Upload className="h-4 w-4" />
                        <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 800x500px or larger (Max 5MB)
                  </p>
                </div>

                <div>
                  <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="product-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                    placeholder="Enter product description"
                    aria-required="true"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    type="submit"
                    className="flex-1 bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isUploading}
                    aria-label={editingProduct ? 'Update product' : 'Add product'}
                  >
                    <Save className="h-5 w-5" />
                    <span>{isUploading ? 'Saving...' : (editingProduct ? 'Update' : 'Add')} Product</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={closeModal}
                    className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Cancel"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageProducts;