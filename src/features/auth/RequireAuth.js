import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";

const RequireAuth = (props) => {
  const requirement = props.role;
  const user = useSelector(selectCurrentUser);
  const accessToken = user?.accessToken;
  const location = useLocation();
  // if !accessToken => navigate signin
  // if accessToken, compare required role and user.roles
  // if !required role = user.roles => show "you must be ${required role}"
  // if required role = user.roles =>  show outlet

  let content;

  if (!accessToken) {
    content = <Navigate to="/signin" state={{ from: location }} replace />;
  } else {
    if (requirement) {
      if (user.roles.includes(requirement)) {
        content = <Outlet />;
      } else {
        content = "You must be a " + requirement + " to view this content";
      }
    } else {
      content = <Outlet />;
    }
  }

  return content;
};
export default RequireAuth;
