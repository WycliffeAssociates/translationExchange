import React from "react";

import styled from "styled-components";

export const YesButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <span style={{textDecoration:'underline'}}>Yes </span>
      <i className="material-icons" style={{ fontSize: "1.9vw" }}>
        check
      </i>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 20px;
  color: white;
  background: linear-gradient(to bottom, #0076ff, #00c5ff);
  padding: 0.4vw 4vw;
  font-size: 1.2vw;
  font-weight: 100;
  border: none;

  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
