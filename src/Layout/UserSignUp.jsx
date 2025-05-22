import React, { useEffect } from 'react';
import SignUpNavbar from '../components/signUpNavber/SignUpNavbar';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/scrollTop/ScrollTop';
import LoginNavbar from '../components/loginNavbar/LoginNavbar';

const UserSignUp = () => {
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
            <LoginNavbar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default UserSignUp;