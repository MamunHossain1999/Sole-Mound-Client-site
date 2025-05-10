import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Facebook, Heart, Star, Twitter } from 'lucide-react';
import { PiPinterestLogo } from 'react-icons/pi';

// This function will fetch both the product and its variants
const fetchProductWithVariants = async (id) => {
  try {
    // First fetch basic product info
    const { data: products } = await axios.get('/featured.json');
    const product = products.find((p) => String(p.id) === String(id));
    
    if (!product) throw new Error('Product not found');
    
    // Then fetch product variants (this should be your separate variants API or file)
    const { data: variants } = await axios.get('/product-variants.json');
    const productVariants = variants[id] || {
      sizes: [],
      memories: [],
      storages: [],
      colors: []
    };
    
    // Return combined data
    return {
      ...product,
      variants: productVariants
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');

  const { data: productData, isLoading, isError } = useQuery({
    queryKey: ['product-variants', id],
    queryFn: () => fetchProductWithVariants(id),
  });

  if (isLoading) return (
    <div className="container mx-auto p-4 ">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="md:w-1/2 bg-gray-200 h-96 rounded"></div>
        <div className="md:w-1/2">
          <div className="h-6 bg-gray-200 w-3/4 mb-4 rounded"></div>
          <div className="h-8 bg-gray-200 w-full mb-4 rounded"></div>
          <div className="h-4 bg-gray-200 w-1/2 mb-2 rounded"></div>
          <div className="h-4 bg-gray-200 w-2/3 mb-4 rounded"></div>
          <div className="h-8 bg-gray-200 w-1/3 mb-6 rounded"></div>
          <div className="h-6 bg-gray-200 w-full mb-4 rounded"></div>
          <div className="h-6 bg-gray-200 w-full mb-4 rounded"></div>
          <div className="h-6 bg-gray-200 w-full mb-4 rounded"></div>
        </div>
      </div>
    </div>
  );
  
  if (isError || !productData) return (
    <div className="container mx-auto p-4">
      <div className="bg-red-50 border border-red-200 p-4 rounded">
        <p className="text-red-600 font-medium">Error loading product</p>
        <p className="text-red-500">Please try again later</p>
      </div>
    </div>
  );

  const product = productData;
  const thumbnails = product?.thumbnails || [product.image];
  
  // Get variants from fetched data or use default empty arrays
  const variants = product.variants || {};
  const sizes = variants.sizes || ['14-inch Liquid Retina XDR display', '13-inch Liquid Retina display'];
  const memories = variants.memories || ['8GB unified memory', '16GB unified memory'];
  const storages = variants.storages || ['256GB SSD Storage', '1TV SSD Storage'];
  const colors = variants.colors || [
    { name: 'Space Gray', color: '#999' },
    { name: 'Silver', color: '#ddd' }
  ];

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container mx-auto p-4 font-sans bg-white">
      <div className="flex flex-col md:flex-row gap-8 text-gray-900">
        {/* Left - Images */}
        <div className="md:w-1/2">
          <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-center">
            <img
              src={thumbnails[selectedThumbnail]}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className={`w-16 h-16 border rounded cursor-pointer p-1 ${
                  selectedThumbnail === index ? 'border-purple-500' : 'border-gray-300'
                }`}
                onClick={() => setSelectedThumbnail(index)}
              >
                <img src={thumb} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right - Info */}
        <div className="md:w-1/2">
          {/* Dynamic Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              {product.rating} Star Rating{' '}
              <span className="text-xs">({product.reviews?.toLocaleString()} User feedback)</span>
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h1>

          <div className="text-sm text-gray-600 mb-2">
            <p>Sku: <span className="text-black">{product.sku || 'A264671'}</span></p>
            <p>Brand: <span className="text-black">{product.brand || 'Apple'}</span></p>
            <p>Category: <span className="text-black">{product.category}</span></p>
            <p>Availability: <span className="text-green-600 font-medium">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
          </div>

          <div className="flex items-center text-xl mb-4">
            <span className="text-gray-500 line-through mr-2">${product.originalPrice}</span>
            <span className="text-black font-bold">${product.currentPrice}</span>
            <span className="ml-3 bg-yellow-400 text-xs px-2 py-1 rounded">{product.discountPercentage} OFF</span>
          </div>

          {/* Color */}
          <div className="mb-4">
            <p className="text-sm mb-1">Color</p>
            <div className="flex gap-3">
              {colors?.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedColor === index ? 'border-purple-600' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-4">
            <p className="text-sm mb-1">Size</p>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select a size</option>
              {sizes?.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Memory */}
          <div className="mb-4">
            <p className="text-sm mb-1">Memory</p>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={selectedMemory}
              onChange={(e) => setSelectedMemory(e.target.value)}
            >
              <option value="">Select memory</option>
              {memories?.map((mem) => (
                <option key={mem} value={mem}>{mem}</option>
              ))}
            </select>
          </div>

          {/* Storage */}
          <div className="mb-4">
            <p className="text-sm mb-1">Storage</p>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={selectedStorage}
              onChange={(e) => setSelectedStorage(e.target.value)}
            >
              <option value="">Select storage</option>
              {storages.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Quantity & Actions */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border rounded">
              <button onClick={decrementQuantity} className="px-3 py-1 hover:bg-gray-100">−</button>
              <span className="px-4">{quantity}</span>
              <button onClick={incrementQuantity} className="px-3 py-1 hover:bg-gray-100">+</button>
            </div>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded text-sm transition">
              Add to Cart
            </button>
            <button className="border hover:border-gray-400 px-6 py-2 rounded text-sm transition">Buy</button>
          </div>

          {/* Wishlist & Share */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <button className="flex items-center gap-2 hover:text-purple-500 transition">
              <Heart size={16} />
              Add to Wishlist
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Share product:</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-600 flex items-center justify-center cursor-pointer transition">
                  <Facebook size={16} className="text-gray-600 hover:text-white transition" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-sky-500 flex items-center justify-center cursor-pointer transition">
                  <Twitter size={16} className="text-gray-600 hover:text-white transition" />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-600 flex items-center justify-center cursor-pointer transition">
                  <PiPinterestLogo size={16} className="text-gray-600 hover:text-white transition" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


  return (
    <div className="flex items-center space-x-2">
      <div
        onClick={() => setChecked(!checked)}
        className={`w-6 h-6 flex items-center justify-center border-2 rounded cursor-pointer ${
          checked ? "bg-blue-500 border-blue-500" : "border-gray-400"
        }`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="select-none">Mark me!</span>
    </div>
  );

    </div>
  );
};
import React from 'react';
import { useState } from 'react';
import loginBgImg from '../../assets/loginImg/Screenshot_2.png';


const LoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [rememberMe, setRememberMe] = useState(false);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password, rememberMe });
      };
    
      return (
        <div className="flex min-h-screen "
            style={{ backgroundImage: `url(${loginBgImg})` }}
            >

          <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto">
            {/* Left side with branding and illustrations */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-md flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 3L12 9L6 3H18Z" fill="currentColor" />
                      <path d="M12 9L18 15H6L12 9Z" fill="currentColor" />
                      <path d="M6 15L3 18V6L6 3V15Z" fill="currentColor" />
                      <path d="M18 15L21 18V6L18 3V15Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="ml-3 text-xl font-bold text-purple-800">Gold Maund</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-pink-600 mb-4">Welcome!</h1>
              <p className="text-xl text-pink-500 mb-8">Unlock exclusive perks when you log in</p>
              
              <div className="mt-auto space-y-8">
                {/* Shopping cart illustration */}
                <div className="flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H5.5L6 6M6 6L8 15H19L21 6H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="9" cy="19" r="1" stroke="currentColor" strokeWidth="2" />
                        <circle cx="17" cy="19" r="1" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      20%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side with login form */}
            <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
    
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <span className="text-sm text-purple-600 hover:text-purple-500 cursor-pointer">
                        Forgot Password?
                      </span>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
    
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
    
                  <div>
                    <button
                      onClick={handleSubmit}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Log In
                    </button>
                  </div>
                </div>
    
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or</span>
                    </div>
                  </div>
    
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    </button>
                  </div>
                </div>
    
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <span className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer">
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
export default LoginPage;
export default ProductDetailsPage;




