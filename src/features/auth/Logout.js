import { useDispatch } from "react-redux";
import { logOut } from "./authSlice";
import { useLogoutMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <button onClick={handleLogout}>Logout</button>
  );
};
