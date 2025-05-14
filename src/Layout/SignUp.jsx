import React from 'react';
import SignUpNavbar from '../components/signUpNavber/SignUpNavbar';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/scrollTop/ScrollTop';

const SignUp = () => {
    return (
        <div>
            <ScrollToTop/>
            <SignUpNavbar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default SignUp;