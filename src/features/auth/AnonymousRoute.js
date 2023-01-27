import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";

const AnonymousRoute = () => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const accessToken = user?.accessToken;

  return accessToken ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default AnonymousRoute;
