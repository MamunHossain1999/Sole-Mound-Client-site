import React from 'react';
import { Navigate , useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} =useAuth();
    const location = useLocation();
        if(location){
            return <div className="text-center mt-20">Loading...</div>;
        }
        if(user){
            return <Navigate to="/login-page" state={{ from: location }} replace />;
        }
   
};

export default PrivateRoute;