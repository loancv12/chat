import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequiredAuth = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
