import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

// src/routes/ProtectedRoute.js
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useUser();

  console.log("User:", user);
  console.log("Allowed Roles:", allowedRoles);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.userType)) {
    console.log("Unauthorized: User type not allowed");
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
export default ProtectedRoute;