import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Signin from "./features/auth/Signin";
import Signup from "./features/auth/Signup";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import RequireAuth from "./features/auth/RequireAuth";
import AnonymousRoute from "./features/auth/AnonymousRoute";
import UsersList from "./features/users/UsersList";
import ServicesRoute from "./features/services/ServicesRoute";
import { OrderPay } from "./features/orders/OrderPay";
import { ROLES_LIST } from "./config/roles_list";
import OrderStatus from "./features/orders/OrderStatus";
import { BecomeBuddy } from "./pages/BecomeBuddy";
import { OrdersList } from "./features/orders/OrdersList";
import { Profile } from "./pages/Profile";
import { BuddiesWithServices } from "./features/buddies/BuddiesWithServices";
import BuddyRoute from "./features/buddies/BuddyRoute";
import ChatPage from "./pages/Chat/ChatPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        {/* <Route index element={<Public />} /> */}
        <Route path="buddies/services" element={<BuddiesWithServices />} />
        <Route path="buddy/*" element={<BuddyRoute />} />
        {/* anonymous routes */}
        <Route element={<AnonymousRoute />}>
          <Route path="/landing" element={<Welcome />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="chat/*" element={<ChatPage />} />
          <Route path="profile/*" element={<Profile />} />
          <Route path="becomebuddy" element={<BecomeBuddy />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="services/*" element={<ServicesRoute />} />
          <Route path="orders/:orderId/pay" element={<OrderPay />} />
          <Route path="orders/:orderId/status" element={<OrderStatus />} />
        </Route>
        <Route element={<RequireAuth role={ROLES_LIST.Admin} />}>
          <Route path="userslist" element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
