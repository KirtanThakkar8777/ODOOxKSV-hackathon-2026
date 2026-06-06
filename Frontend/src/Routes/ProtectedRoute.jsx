import { Navigate } from "react-router-dom";
import useUserStore from "../modules/user/store/userStore";

const ProtectedRoute = ({ children }) => {
  const token = useUserStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;