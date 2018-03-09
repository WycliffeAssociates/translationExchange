import React from 'react';

import styled from 'styled-components';

export default class YesButton extends React.Component {

  render() {

    return (
      <Button onClick={this.props.onClick}> Yes <i className="fa fa-check" /> </Button>
    );
  }
}

const Button= styled.button`
  border-radius: 20px;
  color: white;
  background: linear-gradient(to bottom, #0076FF, #00C5FF);
  padding: 0.4vw 4vw;
  font-size: 1.5vw;
  font-weight: 100;
  border: none;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.5);
  cursor: pointer;
`;
