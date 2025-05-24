import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login-page" />;
  }

  return children;
};

export default PrivateRoute;
