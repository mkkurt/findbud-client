import React from "react";
import welcome1 from "../../images/welcome-1.svg";
import { useNavigate } from "react-router-dom";
import { BuddiesWithServices } from "../../features/buddies/BuddiesWithServices";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#03001C",
        color: "white",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={welcome1} alt="welcome" />
      <h4 style={{ fontSize: "1rem" }}>
        Connect with people around the world, make friends!
      </h4>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          style={{
            margin: "10px",
            padding: "11px 43px",
            borderRadius: "40px",
            background:
              "linear-gradient(93.35deg, #FE6AB7 3.55%, #9B4AEB 47.23%, #3931F9 97.46%)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/buddies/services")}
        >
          Play Now!
        </button>
        <button
          style={{
            margin: "10px",
            padding: "11px 43px",
            borderRadius: "40px",
            background:
              "linear-gradient(black, black) padding-box, linear-gradient(93.35deg, #FE6AB7 3.55%, #9B4AEB 47.23%, #3931F9 97.46%) border-box",
            border: " 1px solid transparent",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onClick={() => navigate("/signup")}
        >
          Become a Buddy
        </button>
      </div>
      <h2 style={{ fontSize: "2rem", alignSelf: "flex-start" }}>
        Choose Your New Friend!
      </h2>
      <BuddiesWithServices />
    </div>
  );
}
