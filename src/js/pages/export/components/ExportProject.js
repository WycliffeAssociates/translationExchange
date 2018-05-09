import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from '../../../components/NavBar';
import {ChapterSelected} from './ChapterSelected';
import styled from 'styled-components';





export class ExportProject extends Component {

  render() {
    const { goBack } = this.props;

    return (
      <ExportProjectContainer>
        <Button color={'#009CFF'} height={'40px'} width={'214px'} iconSize={'24px'} onClick={goBack}> <i class="material-icons"> keyboard_backspace</i> go Back </Button>
        <ButtonsContainer>
          <SingleButtonContainer>
            <Button color={'#E56060'} height={'200px'} width={'214px'} iconSize={'148px'} > <i class="material-icons"> remove_from_queue</i> </Button>
          </SingleButtonContainer>
          <SingleButtonContainer>
            <Button color={'#009CFF'} height={'200px'} width={'214px'} iconSize={'148px'} > <i class="material-icons"> volume_up</i> </Button>
          </SingleButtonContainer>
        </ButtonsContainer>
      </ExportProjectContainer>
    );
  }

}


const ExportProjectContainer = styled.div`
  display: flex;
  align-items:center;
  flex-direction: column;

`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content:center;
  text-align: center;
  color:${props => props.color};
  border-radius: 3px;
  border: 2px solid black;
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


const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SingleButtonContainer = styled.div`
  margin: 40px 40px 40px 40px;
`;


export default ExportProject;
