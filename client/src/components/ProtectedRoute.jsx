import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    fetch("/check-session")
      .then((response) => response.json())
      .then((data) => {
        setIsAuthenticated(data.isLoggedIn);
      });
  }, []);

  return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
