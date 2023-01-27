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
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
`;

export const NavLink = styled(Link)`
  color: #808080;
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
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  white-space: nowrap;
  */ @media screen and (max-width: 768px) {
    display: none;
  }
`;
