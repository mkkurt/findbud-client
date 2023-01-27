import React from "react";
import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./SidePanel.css";
import ChatPage from "../ChatPage";

export const SidePanel = ({ open, setOpen }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        zIndex: "100",
        backgroundColor: "#f5f5f5",
      }}
    >
      <button onClick={() => setOpen(true)}>{"<Chat"}</button>
      <SlidingPane
        overlayClassName="sliding-pane__overlay"
        className="sliding-pane__content"
        isOpen={open}
        // title="Hey, it is optional pane title.  I can be React component too."
        // subtitle="Optional subtitle."
        closeIcon={<div>{">"}</div>}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setOpen(false);
        }}
      >
        <ChatPage />
      </SlidingPane>
    </div>
  );
};
