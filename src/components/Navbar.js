import React from "react";
import { Nav, NavLink, NavMenu, NavLogo } from "./NavbarElements";
import { selectCurrentUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { ROLES_LIST } from "../config/roles_list";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const roles = currentUser?.roles;
  const isBuddy = roles?.includes(ROLES_LIST.Buddy);
  if (currentUser) {
    return (
      <Nav>
        <NavLogo to="/landing">
          <span>Coop</span>
          <span style={{ color: "#9300FF" }}>ZONE</span>
        </NavLogo>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/buddies/services">Buddies</NavLink>
          <NavLink to="/chat">Chat</NavLink>
          {isBuddy ? null : (
            <>
              <NavLink to="/becomebuddy">Become a Buddy</NavLink>
              <NavLink to="/orders">Your Orders</NavLink>
            </>
          )}
        </NavMenu>
      </Nav>
    );
  } else {
    return (
      <Nav>
        <NavLogo to="/landing">
          <span>Coop</span>
          <span style={{ color: "#9300FF" }}>ZONE</span>
        </NavLogo>
        <NavMenu>
          <NavLink to="/signin">Sign In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </NavMenu>
      </Nav>
    );
  }
};

export default Navbar;
