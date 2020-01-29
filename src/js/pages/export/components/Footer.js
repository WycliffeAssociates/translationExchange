import React from 'react';
import styled, {keyframes} from 'styled-components';
import {slideInUp} from 'react-animations';



export const Footer = ({nextStep, txt}) => {
  return (
    <Container onClick={nextStep}>
      <Button> <i class="material-icons">touch_app</i> {txt.get("next")} </Button>
    </Container>
  );

};


const slideInAnimation = keyframes`${slideInUp}`;

const Button = styled.button`
    background: linear-gradient(to bottom, #0076FF, #00C5FF);
    width: 214px;
    height: 60px;
    margin-right: 2vw;
    font-size: 20px;
    font-weight: 100;
    color: white;
    border: none;
    border-radius: 2px;
    box-shadow: 1px 3px 2px 1px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: .2s ease-in-out;

    i {
      vertical-align: middle;
    }

    :hover{
      background: linear-gradient(to bottom, #3BAC29, #64f38c);
      color: #FFF;

    }
    `;

Button.displayName = 'Button';



const Container = styled.div`
  background-color: #fff;
  width: 100%;
  bottom: 0;
  position:absolute;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  box-shadow: 3px 4px 5px 7px rgba(0,0,0,0.2);
  z-index: 2;
  min-height: 90px;
  animation: ${slideInAnimation} .1s ease-in;

`;
Container.displayName= 'Footer';


export default Footer;
