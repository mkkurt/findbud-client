import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

export const Service = ({ service }) => {
  const navigate = useNavigate();
  const handlePlay = (variantId) => {
    navigate(`/services/${variantId}/create-order`);
  };
  return (
    <ServiceContainer key={service._id}>
      <p>Type: {service.type}</p>
      <p>Buddy: {service.buddy.username}</p>
      <p>Stars: {service.stars}</p>
      <p>Description: {service.description}</p>
      <h3 style={{ textDecoration: "underline" }}>Variants</h3>
      {service.variants.map((variant) => (
        <VariantContainer key={variant._id}>
          <p>Name: {variant.name}</p>
          <p>Price: {variant.price}</p>
          <button onClick={() => handlePlay(variant._id)}>Play</button>
        </VariantContainer>
      ))}
    </ServiceContainer>
  );
};

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(33, 41, 55, 1);
  color: #fff;
  padding: 1rem;
  margin: 1rem;
  border-radius: 5px;
`;

const VariantContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #4d4dff;
  color: #fff;
  padding: 1rem;
  border-radius: 5px;
`;
