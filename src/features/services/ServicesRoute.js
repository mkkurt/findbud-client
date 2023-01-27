import { Routes, Route } from "react-router-dom";
import { ServicesList } from "./ServicesList";
import { ServiceCreateOrder } from "./ServiceCreateOrder";

function ServicesRoute() {
  return (
    <Routes>
      <Route path="/" element={<ServicesList />} />
      <Route
        path=":serviceVariantId/create-order"
        element={<ServiceCreateOrder />}
      />
    </Routes>
  );
}

export default ServicesRoute;
