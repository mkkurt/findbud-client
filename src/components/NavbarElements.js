import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "@emotion/styled";

export const Nav = styled.nav`
  position: sticky;
  position: -webkit-sticky;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
`;

export const NavLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  }
`;

export const NavLogo = styled(Link)`
  color: #808080;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  text-decoration: none;
`;
