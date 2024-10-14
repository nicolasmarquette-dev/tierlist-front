import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface PrivateRouteProps {
  component: React.ComponentType;
}

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Temps en secondes
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Erreur lors du décodage du token", error);
    return false;
  }
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
