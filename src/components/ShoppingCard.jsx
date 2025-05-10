import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { GoHeart } from "react-icons/go";
import { toast } from 'react-toastify';


const fetchShoppingCard = async() => {
    const { data } = await axios.get('/shoppingCard.json'); 
    return data;
  };


const ShoppingCart = () => {
    const [cartItems, setCartItems]=useState([])

     const { data:fetchedCartItems  =[], isLoading, isError } = useQuery({
       queryKey: ['shoppingCard'],
       queryFn: fetchShoppingCard,
     });
   
     useEffect(() => {
        if (fetchedCartItems && Array.isArray(fetchedCartItems)) {
            setCartItems(fetchedCartItems.map(item => ({ ...item, quantity: item.quantity || 1 })));
        }
    }, [fetchedCartItems]);

     if (isLoading) return <p>Loading...</p>;
     if (isError) return <p>Something went wrong!</p>;

    // Quantity increment
    const handleIncrement = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Quantity decrement
    const handleDecrement = (id) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Delete item
    const handleDelete = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        toast.success('Item removed from cart successfully!');
    };

    // Clear cart
    const handleClearCart = () => {
        setCartItems([]);
        toast.success('Clear cart successfully!');
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 0;
    const discount = 50;
    const taxRate = 0.18;
    const tax = (subtotal - discount) * taxRate;
    const total = subtotal + shipping - discount + tax;

    return (
        <div className="py-8">
            <div className="container mx-auto ">
                <h1 className="text-[16px] font-semibold mb-6 bg-[#FDF1F7] pl-10 h-[70px] items-center flex  text-[#101750]">Shopping Cart</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="bg-[#FDF1F7] rounded-lg shadow-md p-4 flex items-center">
                                {/* image section */}
                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />

                                {/* title section */}
                                <div className="flex-grow">
                                    <h2 className="text-[14px] font-[400px] text-[#475156]">{item.name}</h2>
                                    {item.couponsApplicable && <p className="text-[14px] text-[#3CA6FC]">Coupons applicable</p>}
                                    <p className="text-[14px] text-[#475156]">${item.price}</p>
                                </div>

                                {/* heard and delete section */}
                                <div className="flex flex-col items-end space-y-8 ">
                                    <div className='space-x-5'>
                                        <button className="text-gray-500 hover:text-red-500 cursor-pointer items-center " onClick={() => handleDelete(item.id)}>
                                        <RiDeleteBinLine className='w-[24px] h-[24px]' />
                                        </button>
                                        <button className="text-gray-500 cursor-pointer" onClick={() => handleAddToFavorites(item.id)}>
                                        <GoHeart  className='w-[24px] h-[24px]' />
                                        </button>
                                    </div>
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button className="px-2 py-1 text-gray-600 cursor-pointer" onClick={() => handleDecrement(item.id)}>-</button>
                                        <span className="px-2 text-gray-700">{item.quantity}</span>
                                        <button className="px-2 py-1 text-gray-600 cursor-pointer" onClick={() => handleIncrement(item.id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                       <div className='flex justify-end'>
                        <button
                                onClick={handleClearCart}
                                className="bg-[#C8A8E9] text-[#1F1F1F] text-[16px] rounded-md font-semibold py-3 px-6 hover:bg-purple-400 transition-colors cursor-pointer"
                            >
                                Clear Cart
                            </button>
                       </div>
                    </div>

                    {/* right side  sticky top-38 */}
                    <div className="bg-[#FDF1F7] rounded-lg p-6  h-96">
                        <h2 className="text-[24px] font-bold mb-4 text-[#1F1F1F]">Summary</h2>
                        <div className="py-2 flex justify-between">
                            <span className="text-[#505050] font-semibold text-[16px]">Sub-total</span>
                            <span className="text-[#505050] font-semibold text-[16px]">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="py-2 flex justify-between">
                            <span className="text-[#505050] font-semibold text-[16px]">Shipping</span>
                            <span className="text-[#505050] font-semibold text-[16px]">Free</span>
                        </div>
                        <div className=" py-2 flex justify-between">
                            <span className="text-[#505050] font-semibold text-[16px]">Discount</span>
                            <span className="text-[#505050] font-semibold text-[16px]">-${discount.toFixed(2)}</span>
                        </div>
                        <div className="border-b border-[#505050] py-2 flex justify-between">
                            <span className="text-[#505050] font-semibold text-[16px]">Tax</span>
                            <span className="text-[#505050] font-semibold text-[16px]">${tax.toFixed(2)}</span>
                        </div>
                        <div className="py-4 flex justify-between font-semibold text-[#505050] text-[16px]">
                            <span>Subtotal ({cartItems.length} items):</span>
                            <span>${total.toFixed(2)} USD</span>
                        </div>
                        <Link to={'/check-out-page'}>
                            <button className="bg-[#C8A8E9] text-[#1F1F1F] rounded-md py-3 w-full hover:bg-purple-400 transition-colors font-semibold cursor-pointer">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
