import React from 'react';

import styled from 'styled-components';

export default class RedoButton extends React.Component {
  render() {
    return (
      <Button onClick={this.props.onClick}> Redo <i className="fa fa-microphone" /> </Button>
    );
  }

}

const Button= styled.button`
  border-radius: 20px;
  color: #00C5FF;
  background: white;
  padding: 0.4vw 4vw;
  font-size: 1.5vw;
  font-weight: 100;
  border: solid;
  border-width: 2px;
  border-color: #00C5FF;

  box-shadow: 3px 3px 3px rgba(0,0,0,0.5);
  cursor: pointer;
`;
