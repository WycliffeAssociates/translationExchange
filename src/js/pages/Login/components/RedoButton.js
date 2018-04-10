import React from "react";

import styled from "styled-components";

export const RedoButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <span style={{ textDecoration: "underline"}}>
        Redo
      </span>
      <i className="material-icons" style={{ fontSize: "1.7vw" }}>
        redo
      </i>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 20px;
  color: #00c5ff;
  background: white;
  padding: 0.75vw 5vw;
  font-size: 1.1vw;
  font-weight: 100;
  border: solid;
  border-width: 2px;
  border-color: #00c5ff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
Button.displayName = "Button";
