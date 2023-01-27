import { useNavigate, useParams } from "react-router-dom";
import { useGetServiceVariantQuery } from "./servicesApiSlice";
import { useCreateOrderMutation } from "../orders/ordersApiSlice";

export const ServiceCreateOrder = () => {
  const { serviceVariantId } = useParams();
  const { data: serviceVariant } = useGetServiceVariantQuery(serviceVariantId);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const handleCreateOrder = async () => {
    const { data } = await createOrder({
      serviceVariantId,
    });
    const { id } = data;
    navigate(`/orders`);
  };

  return (
    <div>
      <h1>ServiceCreateOrder</h1>
      <p>Service Variant Name: {serviceVariant?.name}</p>
      <p>Service Variant Price: {serviceVariant?.price}</p>
      <button onClick={handleCreateOrder} disabled={isLoading}>
        Create Order
      </button>
    </div>
  );
};
