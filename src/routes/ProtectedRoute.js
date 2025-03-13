import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
const { user } = useUser();

if (!user) {
  return <Navigate to="/login" />;
}

// Ensure userType exists before checking roles
if (!user.userType) {
  console.warn("User has no userType:", user);
  return <Navigate to="/login" />;
}

// Check if userType is allowed
if (!allowedRoles.includes(user.userType)) {
  console.log("Unauthorized: User type not allowed");
  return <Navigate to="/unauthorized" />;
}


  return children;
};
export default ProtectedRoute;