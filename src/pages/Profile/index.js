import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { ROLES_LIST } from "../../config/roles_list";
import { StripeVerify } from "../../features/auth/StripeVerify";
import { BuddyOrdersList } from "../../features/orders/BuddyOrdersList";
import { PayoutCard } from "../../features/payout/PayoutCard";
import { BuddyMyServices } from "../../features/services/BuddyMyServices";
import { CreateService } from "../../features/services/CreateService";
import { Sidebar } from "./Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "../../features/auth/RequireAuth";
import styled from "@emotion/styled";

export const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const roles = currentUser?.roles;
  const isBuddy = roles?.includes(ROLES_LIST.Buddy);
  const index = isBuddy ? "/profile/buddy-services" : "/profile/becomebuddy";
  return (
    <ProfileContainer>
      <Sidebar />
      <ProfileContent>
        <Routes>
          <Route element={<RequireAuth role={ROLES_LIST.Buddy} />}>
            <Route path="/" element={<Navigate to={index} />} />
            <Route path="stripe-verify" element={<StripeVerify />} />
            <Route path="payout-settings" element={<PayoutCard />} />
            <Route path="buddy-orders" element={<BuddyOrdersList />} />
            <Route path="buddy-services" element={<BuddyMyServices />} />
            <Route path="createservice" element={<CreateService />} />
          </Route>
        </Routes>
      </ProfileContent>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
