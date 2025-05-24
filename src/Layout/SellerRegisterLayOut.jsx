import React, { useEffect } from 'react';
import ScrollToTop from '../components/scrollTop/ScrollTop';
import { Outlet } from 'react-router-dom';
import UserLoginNavbar from '../components/loginNavbar/UserLoginNavbar';

const SellerRegisterLayOut = () => {
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
            <UserLoginNavbar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default SellerRegisterLayOut;