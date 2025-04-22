import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ component }) => {
  const { isAuth } = useSelector((state) => state.auth);

  return isAuth ? component ? component : <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
