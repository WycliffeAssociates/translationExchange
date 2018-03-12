import React from 'react';

import styled from 'styled-components';

export const YesButton = ({onClick}) => {

  return (
    <Button onClick={onClick}> Yes <i className="fa fa-check" /> </Button>
  );
};


const Button= styled.button`
  border-radius: 20px;
  color: white;
  background: linear-gradient(to bottom, #0076FF, #00C5FF);
  padding: 0.4vw 4vw;
  font-size: 1.1vw;
  font-weight: 100;
  border: none;
  text-decoration: underline;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  cursor: pointer;
`;
