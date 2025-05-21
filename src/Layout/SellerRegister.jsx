import React, { useEffect } from 'react';
import ScrollToTop from '../components/scrollTop/ScrollTop';
import { Outlet } from 'react-router-dom';
import SellerSignUpNavbar from '../components/sellerSignUpNavbar/SellerSignUpNavbar';

const SellerRegister = () => {
      useEffect(() => {
        // Disable scroll on mount
        document.body.style.overflow = "auto";
        return () => {
          // Restore scroll on unmount
          document.body.style.overflow = "auto";
        };
      }, []);
    return (
        <div className='overflow-hidden'>
            <ScrollToTop/>
            <SellerSignUpNavbar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default SellerRegister;