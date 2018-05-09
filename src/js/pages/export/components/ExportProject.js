import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from '../../../components/NavBar';
import {ChapterSelected} from './ChapterSelected';
import styled from 'styled-components';





export class ExportProject extends Component {

  constructor(props) {
    super(props);
    this.state ={ downloading: false, type: null };
    this.download = this.download.bind(this);
  }

  download(type) {
    this.setState({downloading: true, type});
    this.props.downloading();
  }


  render() {
    const { goBack} = this.props;


    return (
      <ExportProjectContainer>
        <Button color={'#009CFF'} height={'40px'} width={'214px'} iconSize={'24px'} border={'2px'} radius={'4px'} onClick={goBack}>
          <i class="material-icons"> keyboard_backspace</i> go Back
        </Button>
        <ButtonsContainer>
          <SingleButtonContainer color={'#E56060'} >
            <Button onClick={()=> this.download('wav')} color={'#E56060'} height={'200px'} width={'214px'} iconSize={'148px'} border={'4px'} radius={'20px'} >
              <i class="material-icons"> remove_from_queue</i>
            </Button>
            <p>Editing (.WAV)</p>
          </SingleButtonContainer>
          <SingleButtonContainer color={'#009CFF'}>
            <Button onClick={()=> this.download('mp3')} color={'#009CFF'} height={'200px'} width={'214px'} iconSize={'148px'} border={'4px'} radius={'20px'} >
              <i class="material-icons"> volume_up</i>
            </Button>
            <p>Listening (.mp3)</p>
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


const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SingleButtonContainer = styled.div`
  margin: 70px 40px 40px 40px;
  color: ${props => props.color}
  text-align: center;
`;


export default ExportProject;
