import React, {Component} from 'react';
import styled from 'styled-components';
import BorderButton from '../../../components/BorderButton';

export class Downloading extends Component {

  render() {
    return (
      <Container>
        <i class="material-icons"> volume_up</i>
        <p>35%</p>
        <p>downloading mp3 files </p>
        <BorderButton txt={'Cancel'} color={'#009CFF'} height={'40px'} width={'214px'} iconSize={'24px'} border={'2px'} radius={'4px'} />
      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content:center;
  text-align: center;
  color:${props => props.color};
  border-radius: ${props => props.radius};
  border: ${props => props.border} solid black;
  background-color: transparent;
  border-color: ${props => props.color};
  height:${props => props.height};
  width:${props => props.width}
  font-size: 20px;
  font-weight: 100;
  cursor: pointer;
  outline:none;
  transition: .2s ease-in-out;
  :hover{
    background-color: ${props => props.color};
    color: #fff;
  }

  i{
    font-size: ${props => props.iconSize};
  }
`;
