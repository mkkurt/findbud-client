import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "@emotion/styled";

export const SidebarContainer = styled.nav`
  left: 0;
  z-index: 1;
  display: flex;
  padding: 0 1rem;
  margin: 0 1rem 0 0;
  flex-direction: column;
  min-height: 100vh;
  height: auto;
  width: 200px;
  max-width: 200px;
  min-width: 200px;
  background: #f5f5f5;
`;

export const SidebarLink = styled(Link)`
  color: #808080;
  display: flex;
  text-decoration: none;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
  width: 100%;
  height: 40px;
  align-items: center;
  margin: 1rem 0 0 0;
  border-radius: 5px;
`;
