import { useEffect } from "react";
import { useGetAllUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUsersQuery();

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Users List</h1>
        {users.length === 0
          ? "no users found"
          : users.map((user, i) => {
              const urnm = <p key={i}>{user.username}</p>;
              const rls = Object.keys(user.roles).map((role, i) => {
                return <p key={i}>{role}</p>;
              });
              return (
                <div key={i} style={{ border: "1px solid black" }}>
                  {urnm}
                  {rls}
                </div>
              );
            })}

        <Link to="/">Back to Home</Link>
      </section>
    );
  } else if (isError) {
    // render error if is in development
    if (process.env.NODE_ENV === "development") {
      content = <p>{JSON.stringify(error.data)}</p>;
    } else {
      content = <p>Something went wrong. Please try again later.</p>;
    }
  }

  return content;
};

export default UsersList;
