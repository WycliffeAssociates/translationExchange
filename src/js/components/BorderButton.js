import React from 'react';
import styled from 'styled-components';

export default ({txt, icon, color, width, height, radius, iconSize, onClick, fontSize, border, hoverColor }) => {
  return (
    <Button onClick={()=>onClick()} hoverColor={hoverColor} border={border} fontSize = {fontSize} color={color} width={width} height={height} radius={radius} iconSize={iconSize}>
      {txt ? txt : ''}
      {icon ? <i className="material-icons"> {icon}</i> : ''}
    </Button>);
};

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content:center;
  text-align: center;
  color:${props => props.color};
  border-radius: ${props => props.radius};
  border: ${props => props.border ? props.border : '2px'} solid black;
  background-color: transparent;
  border-color: ${props => props.color};
  height:${props => props.height};
  width:${props => props.width}
  font-size: ${props => props.fontSize ? props.fontSize: '20px'};
  font-weight: 100;
  cursor: pointer;
  outline:none;
  transition: .2s ease-in-out;
  :hover{
    background-color: ${props => props.hoverColor? props.hoverColor: props.color};
    border-color: ${props => props.hoverColor? props.hoverColor: props.color};
    color: #fff;
  }

  i{
    font-size: ${props => props.iconSize};
  }
`;

Button.displayName = 'BorderButton';
