import React from "react";
import { Link } from "react-router-dom";

import order from '../../assets/dashboardAccoutImg/yourOrder.svg';
import shoppingCard from '../../assets/dashboardAccoutImg/shoppingCard.svg';
import cardAndAddress from '../../assets/dashboardAccoutImg/cardAndAddress.svg';
import browsingHistory from '../../assets/dashboardAccoutImg/browsing.svg';
import favorite from '../../assets/dashboardAccoutImg/favorite.svg';
import buyAgain from '../../assets/dashboardAccoutImg/buyAgain.svg';
import loginAndSecurity from '../../assets/dashboardAccoutImg/loginAndSecurity.svg';
import giftCard from '../../assets/dashboardAccoutImg/giftCard.svg';
import returnRefund from '../../assets/dashboardAccoutImg/returnRefund.svg';
import privacyPolicy from '../../assets/dashboardAccoutImg/privacyPolicy.svg';

export default function AccountPage() {
  return (
    <div className="container mx-auto md:pb-18 px-4">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-[28px] md:text-[32px] font-semibold text-[#1F1F1F]">Your Account</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 ">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-7">
            <MenuCard 
              title="Your Order"
              description="View past orders or track an order you're waiting on."
              icon={order}
              href="/dashboard/order-history"
            />
            
            <MenuCard 
              title="Shopping Cart"
              description="View and edit your delivery addresses and payment details."
              icon={shoppingCard} 
              href="/shopping-card"
            />
            
            <MenuCard 
              title="Card & Address"
              description="View past orders or track an order you're waiting on."
              icon={cardAndAddress}
              href="/dashboard/card-and-address"
            />
            
            <MenuCard 
              title="Browsing History"
              description="View and edit your delivery addresses and payment details."
              icon={browsingHistory}
              href="/dashboard/brows-history"
            />
            
            <MenuCard 
              title="Favorite"
              description="View and edit your delivery addresses and payment details."
              icon={favorite}
              href="/dashboard/favorite"
            />
            
            <MenuCard 
              title="Login & Security"
              description="View past orders or track an order you're waiting on."
              icon={loginAndSecurity}
              href="/dashboard/login-and-security"
            />
            
            <MenuCard 
              title="Buy Again"
              description="View past orders or track an order you're waiting on."
              icon={buyAgain}
              href="/buy-again"
            />
            
            <MenuCard 
              title="Gift Card"
              description="View and edit your delivery addresses and payment details."
              icon={giftCard}
              href="/gift-card-balance-page"
            />
            
            <MenuCard 
              title="Return/Refund"
              description="View past orders or track an order you're waiting on."
              icon={returnRefund}
              href={`/returnPage/1`}
            />
            
            <MenuCard 
              title="Privacy Policy"
              description="View and edit your delivery addresses and payment details."
              icon={privacyPolicy}
              href="/privacy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuCard({ title, description, icon,  href }) {
  return (
    <Link 
      to={href}
      className="border border-[#F1DAFC] rounded-xl py-8 px-6 flex gap-5 items-center transition cursor-pointer bg-white hover:shadow-md hover:border-[#A8537B]"
    >
      <div >
        <img src={icon} alt={title} className="w-[89px] h-[89px]" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold mb-1 text-[18px] md:text-2xl text-[#1F1F1F]">{title}</h3>
        <p className="text-[14px] md:text-base font-normal text-[#1F1F1F]">{description}</p>
      </div>
    </Link>
  );
}
