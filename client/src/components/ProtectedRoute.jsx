import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/api/check-session");
        setIsLoggedIn(response.data.isLoggedIn);
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

  return isLoggedIn ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
