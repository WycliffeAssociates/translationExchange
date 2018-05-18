import React from "react";
import styled from "styled-components";

export const RedoButton = ({ onClick, txt }) => {
  return (
    <Button onClick={onClick}>
      <span style={{ textDecoration: 'underline', width: '100%'}}>
        {txt.redo}
        <i className="material-icons" style={{ fontSize: '20px' }}>redo</i>
      </span>

    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 60px;
  color: #00c5ff;
  background: white;
  height:50px;
  width:250px;
  font-size: 20px;
  font-weight: 100;
  border: solid;
  border-width: 2px;
  border-color: #00c5ff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
Button.displayName = "Button";
