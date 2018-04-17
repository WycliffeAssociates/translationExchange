import React, {Component} from 'react';
// import { Icon } from "semantic-ui-react";
import styled,{keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import {YesButton} from '../../../pages/Login/components/YesButton';
import {RedoButton} from '../../../pages/Login/components/RedoButton';

class BottomButtons extends Component {


  render() {


    return (
      <Container>
        <RedoButton onClick={this.props.redo} />
        <YesButton  onClick={this.props.done} />
      </Container>
    );
  }
}

const fadeInAnmiation = keyframes`${fadeIn}`;


const Container= styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin-top: 12%;
    animation: ${fadeInAnmiation} .5s ease-in;
  `;


export default BottomButtons;
