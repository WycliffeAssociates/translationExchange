import React from 'react';

import styled from 'styled-components';

export const RedoButton = () => {
  return (
    <Button> Redo <i className="fa fa-microphone" /> </Button>
  );

};

const Button= styled.button`
  border-radius: 20px;
  color: #00C5FF;
  background: white;
  padding: 0.75vw 4vw;
  font-size: 1.5vw;
  font-weight: 100;
  border: none;
  margin-left: 2vw;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.5);
`;
