import React from "react";
import { 
  Clock, ShoppingCart, Heart, CreditCard,  
  ShoppingBag, Gift, RotateCcw, Shield, Lock
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AccountPage() {
 
  return (
    <div className="container mx-auto pb-18 px-4">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-[28px] md:text-[32px] font-semibold text-[#1F1F1F]">Your Account</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 text-gray-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <MenuCard 
              title="Your Order"
              description="View past orders or track an order you're waiting on."
              icon={<ShoppingBag size={24} className="text-white" />}
              bgColor="bg-purple-400"
              href="/dashboard/order-history"
            />
            
            <MenuCard 
              title="Shopping Cart"
              description="View and edit your delivery addresses and payment details."
              icon={<ShoppingCart size={24} className="text-white" />}
              bgColor="bg-blue-400"
              href="/shopping-card"
            />
            
            <MenuCard 
              title="Card & Address"
              description="View past orders or track an order you're waiting on."
              icon={<CreditCard size={24} className="text-white" />}
              bgColor="bg-teal-400"
              href="/dashboard/card-and-address"
            />
            
            <MenuCard 
              title="Browsing History"
              description="View and edit your delivery addresses and payment details."
              icon={<Clock size={24} className="text-white" />}
              bgColor="bg-yellow-300"
              href="/dashboard/brows-history"
            />
            
            <MenuCard 
              title="Favorite"
              description="View and edit your delivery addresses and payment details."
              icon={<Heart size={24} className="text-white" />}
              bgColor="bg-red-300"
              href="/dashboard/wishlist"
            />
            
            <MenuCard 
              title="Login & Security"
              description="View past orders or track an order you're waiting on."
              icon={<Lock size={24} className="text-white" />}
              bgColor="bg-gray-400"
              href="/dashboard/login-and-security"
            />
            
            <MenuCard 
              title="Buy Again"
              description="View past orders or track an order you're waiting on."
              icon={<ShoppingBag size={24} className="text-white" />}
              bgColor="bg-blue-300"
              href="/buy-again"
            />
            
            <MenuCard 
              title="Gift Card"
              description="View and edit your delivery addresses and payment details."
              icon={<Gift size={24} className="text-white" />}
              bgColor="bg-red-200"
              href="/gift-card-balance-page"
            />
            
            <MenuCard 
              title="Return/Refund"
              description="View past orders or track an order you're waiting on."
              icon={<RotateCcw size={24} className="text-white" />}
              bgColor="bg-green-300"
              href={`/returnPage/1`}
            />
            
            <MenuCard 
              title="Privacy Policy"
              description="View and edit your delivery addresses and payment details."
              icon={<Shield size={24} className="text-white" />}
              bgColor="bg-purple-200"
              href="/privacy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuCard({ title, description, icon, bgColor, href }) {
  return (
    <Link 
      to={href}
      className="border border-[#F1DAFC] rounded-lg p-4 flex gap-4 items-start transition cursor-pointer bg-white"
    >
      <div className={`${bgColor} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold mb-1 text-[18px] md:text-[20px] text-[#1F1F1F]">{title}</h3>
        <p className="text-[14px] md:text-[16px] text-[#505050]">{description}</p>
      </div>
    </Link>
  );
}
