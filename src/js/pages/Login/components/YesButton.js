import React from "react";

import styled from "styled-components";

export const YesButton = ({ onClick, txt }) => {
  return (
    <Button onClick={onClick}>
      <span style={{textDecoration: "underline", width:'100%'}}>{txt.get("yes")}
      <i className="material-icons" style={{ fontSize: "20px" }}>check</i>
      </span>

    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 60px;
  color: white;
  background: linear-gradient(to bottom, #0076FF, #00C5FF);
  height:5vw;
  width:17vw;
  font-size: 2vw;
  font-weight: 100;
  border: none;

  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
