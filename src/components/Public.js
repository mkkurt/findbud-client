import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

const Public = () => {
  const user = useSelector(selectCurrentUser);
  const username = user?.username;
  const content = (
    <section
      className="public"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <header>
        <h1>Welcome to Ebud!</h1>
      </header>
      <footer
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {username ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>You are logged in as {username}</p>
            <Link to="/">Home</Link>
            <Link to="/userslist">Users List</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>You are not logged in.</p>
            <Link to="/signin">Signin</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </footer>
    </section>
  );
  return content;
};
export default Public;
