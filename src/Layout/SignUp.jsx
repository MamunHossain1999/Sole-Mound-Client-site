import React, { useEffect } from 'react';
import SignUpNavbar from '../components/signUpNavber/SignUpNavbar';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/scrollTop/ScrollTop';

const SignUp = () => {
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
            <SignUpNavbar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default SignUp;