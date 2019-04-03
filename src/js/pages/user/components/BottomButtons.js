import React, {Component} from 'react';
// import { Icon } from "semantic-ui-react";
import styled,{keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import {YesButton} from '../../../pages/Login/components/YesButton';
import {RedoButton} from '../../../pages/Login/components/RedoButton';

class BottomButtons extends Component {


  render() {
    const {txt, redo, done} = this.props;

    return (
      <Container>
        <RedoButton txt={txt} onClick={redo} />
        <YesButton txt={txt}  onClick={done} />
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
    margin-top: 2vw;
    animation: ${fadeInAnmiation} .5s ease-in;
  `;


export default BottomButtons;
