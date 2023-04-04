import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { ROLES_LIST } from "../../config/roles_list";
import { useGetServiceTypesQuery } from "../../features/services/servicesApiSlice";
import { AdminHome } from "./AdminHome";
import { SidePanel } from "../../pages/Chat/SidePanel/SidePanel";
import { useState } from "react";
const Home = () => {
  const { username, roles } = useSelector(selectCurrentUser);
  const { data, error, isLoading, isError } = useGetServiceTypesQuery();

  const isBuddy = roles.includes(ROLES_LIST.Buddy);
  const isAdmin = roles.includes(ROLES_LIST.Admin);
  const welcome = username ? `Welcome ${username}!` : "Welcome!";

  const [open, setOpen] = useState(false);

  let content;
  if (isAdmin) {
    content = <AdminHome />;
  } else {
    content = (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100vh",
          justifyContent: "space-between",
          backgroundColor: "#03001C",
          color: "white",
        }}
      >
        <section style={{ display: "flex", flexDirection: "column" }}>
          <h1>{welcome}</h1>
          <p>{isBuddy ? "You are a buddy!" : null}</p>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <div>
              <h1>Services</h1>
              {data.map((serviceType) => (
                <div key={serviceType._id}>
                  <p>{serviceType.name}</p>
                  {/* <p>{serviceType.description}</p> */}
                </div>
              ))}
            </div>
          )}
        </section>
        <SidePanel open={open} setOpen={setOpen} />
      </div>
    );
  }

  return content;
};
export default Home;
