import React, {Component} from 'react';
import { Downloading} from './';
import { fadeIn } from 'react-animations';
import styled, {keyframes} from 'styled-components';





export class ExportProject extends Component {

  constructor(props) {
    super(props);
    this.state ={ downloading: false, type: null, icon: '' };
    this.download = this.download.bind(this);
  }


  download(type) {
    if (type=== 'mp3') {
      this.setState({downloading: true, icon: 'volume_up', type });

    }
    else {
      this.setState({downloading: true, icon: 'remove_from_queue', type });
    }

    this.props.downloading(type);
  }

  cancel() {
    this.setState({downloading: false});
    this.props.cancel();
  }





  render() {
    const { goBack, txt, taskId, getDownloadProgress , resetSelected } = this.props;
    const {  icon, type, downloading } = this.state;


    return (
      <ExportProjectContainer>
        { downloading ? <Downloading
          getDownloadProgress={getDownloadProgress} resetSelected={resetSelected} taskId= {taskId} txt={txt} cancel={()=>this.cancel()} icon={icon} type={type}  />
          :
          <OptionsContainer>
            <Button color={'#009CFF'} height={'40px'} width={'214px'} iconSize={'24px'} border={'2px'} radius={'4px'} onClick={goBack}>
              <i class="material-icons"> keyboard_backspace</i>  {txt.get("back")}
            </Button>
            <ButtonsContainer>
              <SingleButtonContainer color={'#E56060'} >
                <Button onClick={()=> this.download('wav')} color={'#E56060'} height={'200px'} width={'214px'} iconSize={'148px'} border={'4px'} radius={'20px'} >
                  <i class="material-icons"> remove_from_queue</i>
                </Button>
                <p>{txt.get("editing")} (.WAV)</p>
              </SingleButtonContainer>
              <SingleButtonContainer color={'#009CFF'}>
                <Button onClick={()=> this.download('mp3')} color={'#009CFF'} height={'200px'} width={'214px'} iconSize={'148px'} border={'4px'} radius={'20px'} >
                  <i class="material-icons"> volume_up</i>
                </Button>
                <p>{txt.get("listening")} (.mp3)</p>
              </SingleButtonContainer>
            </ButtonsContainer>
          </OptionsContainer>
        }
      </ExportProjectContainer>
    );
  }

}

const fadeInAnimation = keyframes`${fadeIn}`;


const ExportProjectContainer = styled.div`
  display: flex;
  align-items:center;
  flex-direction: column;
  animation: ${fadeInAnimation} .4s ease-in-out;
`;

ExportProjectContainer.displayName = 'ExportProjectContainer';

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

OptionsContainer.displayName= 'OptionsContainer';

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
