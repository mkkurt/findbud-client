import { Routes, Route } from "react-router-dom";
import { BuddyProfilePublic } from "./BuddyProfilePublic";

function BuddyRoute() {
  return (
    <Routes>
      <Route path=":buddyId" element={<BuddyProfilePublic />} />
    </Routes>
  );
}

export default BuddyRoute;
