import React, { useEffect } from 'react';
import ScrollToTop from '../components/scrollTop/ScrollTop';
import { Outlet } from 'react-router-dom';
import SellerNavbar from '../components/sellerNavbar/SellerNavbar';

const Seller = () => {
     useEffect(() => {
        // Disable scroll on mount
        document.body.style.overflow = "hidden";
        return () => {
          // Restore scroll on unmount
          document.body.style.overflow = "auto";
        };
      }, []);
    return (
        <div className='overflow-hidden'>
            <ScrollToTop/>
            <SellerNavbar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};


export default Seller;