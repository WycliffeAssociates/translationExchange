import React from 'react';

import styled from 'styled-components';

export const RedoButton = ({onClick}) => {

  return (
    <Button onClick={onClick}> Redo <i className="fa fa-redo" /> </Button>
  );

};

const Button= styled.button`
  border-radius: 20px;
  color: #00C5FF;
  background: white;
  padding: 0.75vw 5vw;
  font-size: 1.1vw;
  font-weight: 100;
  border: solid;
  border-width: 2px;
  border-color: #00C5FF;
  text-decoration: underline;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  cursor: pointer;
`;
Button.displayName = 'Button';
