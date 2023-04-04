import styled from "@emotion/styled";
import { useGetBuddiesWithServicesQuery } from "./buddiesApiSlice";
import { useNavigate } from "react-router-dom";

export const BuddiesWithServices = () => {
  const { data, error, isLoading, isError } = useGetBuddiesWithServicesQuery({
    page: 1,
    limit: 10,
  });
  const navigate = useNavigate();

  const handleCardClick = (buddyId) => {
    // navigate(`/buddy/${buddyId}`);
    navigate({
      pathname: `/buddy/${buddyId}`,
      search: "?tab=services",
    });
  };
  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
      }}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <Grid>
          {data.map((buddy) => (
            <Card key={buddy._id} onClick={() => handleCardClick(buddy._id)}>
              <CardImage
                src={
                  buddy.profilePicUrl ||
                  "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png"
                }
                alt={buddy.username}
                onLoad={(e) => {
                  e.target.style.height = "100%";
                  e.target.style.width = "100%";
                }}
              />
              <CardContent>
                <CardName>{buddy.username}</CardName>
                {buddy.services.slice(0, 3).map((service) => (
                  <CardService>
                    <CardServiceName key={service._id}>
                      {service.type}
                    </CardServiceName>
                    {/* <CardDescription>{service.description}</CardDescription> */}
                    <CardRating>{service.stars}⭐️</CardRating>
                    {/* {service.variants.map((variant) => (
                      <CardVariant key={variant._id}>
                        {variant.name}
                        <CardPrice>{variant.price}</CardPrice>
                      </CardVariant>
                    ))} */}
                  </CardService>
                ))}
              </CardContent>
            </Card>
          ))}
        </Grid>
      )}
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: auto;
  font-family: "Open Sans", sans-serif;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  max-width: 300px; //TODO instead use skeleton
  max-height: 300px;
`;

const CardContent = styled.div`
  background: rgba(255, 255, 255, 0.37);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 1;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  position: absolute;
  padding: 10px;
`;

const CardService = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.37);
  margin: 0.2rem;
  border-radius: 5px;
  padding: 0.2rem;
  font-size: 0.8vw;
  height: 2rem;
`;

const CardImage = styled.img`
  object-fit: cover;
`;

const CardName = styled.h1`
  font-size: 1.5vw;
  font-weight: bold;
`;

const CardServiceName = styled.h2``;

const CardDescription = styled.p``;

const CardRating = styled.p`
  margin-left: 0.5rem;
  font-size: 0.8rem;
`;

const CardVariant = styled.p`
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
`;

const CardPrice = styled.p`
  color: gold;
`;
