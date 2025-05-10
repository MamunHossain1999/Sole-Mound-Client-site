
import { useState } from 'react';
import React from "react";
import { Link } from 'react-router-dom';
const CheckoutPage=()=> {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'United States',
    city: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvc: ''
  });

  const cartItems = [
    { id: 1, name: 'Ut diam consequat', color: 'Brown', size: 'XL', price: 32.00, image: '/api/placeholder/60/60' },
    { id: 2, name: 'Ut diam consequat', color: 'Brown', size: 'XL', price: 32.00, image: '/api/placeholder/60/60' },
    { id: 3, name: 'Ut diam consequat', color: 'Brown', size: 'XL', price: 32.00, image: '/api/placeholder/60/60' },
    { id: 4, name: 'Ut diam consequat', color: 'Brown', size: 'XL', price: 32.00, image: '/api/placeholder/60/60' },
  ];

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const shipping = 0;
  const discount = 24;
  const tax = 61.99;
  const total = subtotal + shipping - discount + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Order Complete Header */}
      <div className="bg-pink-50 py-4 text-center">
        <h1 className="text-lg font-medium text-gray-800">Order Complete</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="w-full lg:w-2/3">
            {/* Contact Information */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-medium text-gray-700">Contact Information</h2>
                <p className="text-sm text-blue-500">Already have an account? <a href="#" className="underline">Log in</a></p>
              </div>
              
              <div className="mb-4">
                <input 
                  type="text" 
                  name="email" 
                  placeholder="Email or mobile phone number" 
                  className="w-full p-3 border border-gray-300 rounded"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center mb-2">
                <input type="checkbox" id="newsletter" className="h-4 w-4 text-blue-600" />
                <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                  Keep me up to date on news and exclusive offers
                </label>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-700 mb-4">Shipping Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="First Name" 
                  className="p-3 border border-gray-300 rounded"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder="Last Name" 
                  className="p-3 border border-gray-300 rounded"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <input 
                  type="text" 
                  name="companyName" 
                  placeholder="Company Name (Optional)" 
                  className="w-full p-3 border border-gray-300 rounded"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <div className="relative">
                  <select 
                    name="country" 
                    className="appearance-none w-full p-3 border border-gray-300 rounded"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option>London</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <input 
                    type="text" 
                    name="city" 
                    placeholder="City/State" 
                    className="w-full p-3 border border-gray-300 rounded"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-700 mb-4">Payment Option</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div 
                  className={`border rounded p-4 text-center cursor-pointer ${paymentMethod === 'cash' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <div className="flex justify-center text-purple-600 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <p className="text-sm">Cash on Delivery</p>
                  {paymentMethod === 'cash' && (
                    <div className="mt-2 flex justify-center">
                      <div className="h-4 w-4 rounded-full bg-purple-500 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                  )}
                </div>

                <div 
                  className={`border rounded p-4 text-center cursor-pointer ${paymentMethod === 'paypal' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <div className="flex justify-center text-blue-600 mb-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.2 6.4c0.1-0.7 0-1.4-0.3-2-0.3-0.6-0.9-1-1.5-1.2-0.7-0.2-1.4-0.2-2.1-0.2h-4.4c-0.3 0-0.6 0.2-0.7 0.5l-2 12.9c0 0.2 0 0.4 0.1 0.5 0.1 0.1 0.3 0.2 0.4 0.2h2.8l0.2-1.1v0.1c0.1-0.3 0.3-0.5 0.7-0.5h1.4c2.8 0 5-1.1 5.6-4.4 0-0.1 0-0.2 0.1-0.3 0.3-1.4 0.1-2.4-0.7-3.2-0.3-0.3-0.6-0.5-1-0.6 0.2-0.2 0.4-0.3 0.5-0.5 0.3-0.3 0.5-0.7 0.6-1.2 0.1-0.1 0.1-0.2 0.1-0.3 0.1-0.1 0.1-0.2 0.1-0.3 0.1-0.3 0.1-0.6 0.1-0.9 0 0 0 0 0 0zM17.2 6.6c0 0.2 0 0.4-0.1 0.6 0 0.1 0 0.1-0.1 0.2C16.6 9 15 9.7 13 9.7h-1c-0.3 0-0.6 0.2-0.7 0.5L10.9 12l-0.3 2.1c0 0.2 0 0.4 0.1 0.5 0.1 0.1 0.3 0.2 0.4 0.2h1.2c0.3 0 0.6-0.2 0.7-0.5v-0.1l0.2-1.1 0.1-0.7c0.1-0.3 0.3-0.5 0.7-0.5h0.3c2.1 0 3.8-0.9 4.3-3.4 0.2-1 0.1-1.9-0.5-2.5-0.2-0.2-0.4-0.3-0.6-0.4H17.2z" />
                    </svg>
                  </div>
                  <p className="text-sm">Paypal</p>
                  {paymentMethod === 'paypal' && (
                    <div className="mt-2 flex justify-center">
                      <div className="h-4 w-4 rounded-full bg-purple-500 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                  )}
                </div>

                <div 
                  className={`border rounded p-4 text-center cursor-pointer ${paymentMethod === 'card' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex justify-center text-purple-600 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                  </div>
                  <p className="text-sm">Debit/Credit Card</p>
                  {paymentMethod === 'card' && (
                    <div className="mt-2 flex justify-center">
                      <div className="h-4 w-4 rounded-full bg-purple-500 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      name="cardName" 
                      placeholder="Name of card" 
                      className="w-full p-3 border border-gray-300 rounded"
                      value={formData.cardName}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <input 
                      type="text" 
                      name="cardNumber" 
                      placeholder="Card Number" 
                      className="w-full p-3 border border-gray-300 rounded"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      name="expDate" 
                      placeholder="Expired Date" 
                      className="p-3 border border-gray-300 rounded"
                      value={formData.expDate}
                      onChange={handleInputChange}
                    />
                    <input 
                      type="text" 
                      name="cvc" 
                      placeholder="CVC" 
                      className="p-3 border border-gray-300 rounded"
                      value={formData.cvc}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {/* Product Items */}
              <div className="mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex mb-4 items-center">
                    <div className="w-16 h-16 mr-4">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500">Color: {item.color}</p>
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sub-total</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal (4 items):</span>
                    <span className="font-bold">${total.toFixed(2)} USD</span>
                  </div>
                  
                  <Link to='/check-out-order-success'>
                    <button className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition">
                        Proceed to Checkout
                    </button>
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;