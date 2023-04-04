import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useGetBuddyInfoQuery } from "./buddiesApiSlice";
import styled from "@emotion/styled";
import { useState } from "react";

export const BuddyProfilePublic = () => {
  const { buddyId } = useParams();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab);

  const {
    data: buddy,
    error,
    isLoading,
    isError,
  } = useGetBuddyInfoQuery(buddyId);
  return (
    <Container>
      <h1>BuddyProfilePublic</h1>
      <TabsContainer>
        {tab === "services" ? (
          <ActiveTab>Services</ActiveTab>
        ) : (
          <Tab onClick={() => navigate(`/buddy/${buddyId}?tab=services`)}>
            Services
          </Tab>
        )}
        {tab === "reviews" ? (
          <ActiveTab>Reviews</ActiveTab>
        ) : (
          <Tab onClick={() => navigate(`/buddy/${buddyId}?tab=reviews`)}>
            Reviews
          </Tab>
        )}
        {tab === "about" ? (
          <ActiveTab>About</ActiveTab>
        ) : (
          <Tab onClick={() => navigate(`/buddy/${buddyId}?tab=about`)}>
            About
          </Tab>
        )}
      </TabsContainer>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {tab === "about" && (
            <div>
              <p>{buddy.username}</p>
            </div>
          )}
          {tab === "reviews" && <div>'nothing here yet'</div>}
          {tab === "services" &&
            buddy.serviceVariants &&
            buddy.serviceVariants.length > 0 && (
              <div>
                {buddy.serviceVariants.map((serviceVariant) => (
                  <Service key={serviceVariant._id}>
                    <p>{serviceVariant.name}</p>
                    <p>{serviceVariant.price}</p>
                    <button
                      onClick={() =>
                        navigate(`/services/${serviceVariant._id}/create-order`)
                      }
                    >
                      Play
                    </button>
                  </Service>
                ))}
              </div>
            )}
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Tab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
`;

const ActiveTab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: blue;
  cursor: pointer;
`;

const Service = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: #fff;
`;
