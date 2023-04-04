import React from "react";
import { SidebarContainer, SidebarLink } from "./SidebarElements";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { ROLES_LIST } from "../../config/roles_list";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const roles = currentUser?.roles;
  const isBuddy = roles?.includes(ROLES_LIST.Buddy);
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

  const buddyLinks = (
    <>
      <SidebarLink to="/profile/stripe-verify">Stripe Verification</SidebarLink>
      <SidebarLink to="/profile/payout-settings">Payout Settings</SidebarLink>
      <SidebarLink to="/profile/buddy-orders">Buddy Orders</SidebarLink>
      <SidebarLink to="/profile/buddy-services">Buddy Services</SidebarLink>
      <SidebarLink to="/profile/createservice">Create Service</SidebarLink>
    </>
  );
  const userLinks = (
    <>
      <SidebarLink to="/becomebuddy">Become a Buddy</SidebarLink>
    </>
  );
  return (
    <SidebarContainer>
      {isBuddy ? (
        <>
          {buddyLinks}
          <SidebarLink onClick={handleLogout}>Logout</SidebarLink>
        </>
      ) : (
        <>
          {userLinks}
          <SidebarLink onClick={handleLogout}>Logout</SidebarLink>
        </>
      )}
    </SidebarContainer>
  );
};
