
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../Redux/api/userApi.js";


interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "customer" | "seller")[];
}

const PrivateRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
  const location = useLocation();

  const { data: user, isLoading } = useGetProfileQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;