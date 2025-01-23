import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/api/check-session");
        setIsLoggedIn(response.data.isLoggedIn);
        setUserRole('ini set user',response.data.user.role);
      } catch (error) {
        console.error("Error checking session:", error.message);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/Login" />;
  }

  const additionalProps = userRole !== "Super Admin" ? { notSuper: true } : {};
  return React.cloneElement(children, { ...additionalProps });
};

export default ProtectedRoute;
