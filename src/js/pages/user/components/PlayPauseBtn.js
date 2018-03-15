import React, {Component} from 'react';
//import { Icon } from "semantic-ui-react";
import styled from 'styled-components';



class PlayPauseBtn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: 'play',

    };
    this.startPlaying = this.startPlaying.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.playing) {
      this.setState({icon: 'play'});
    }
  }


  startPlaying() {
    this.props.startPlaying();

    if (this.props.playing) {
      this.setState({icon: 'play'});
    } else {

      this.setState({icon: 'pause'});
    }

  }

  render() {
    const {icon}= this.state;
    return (
      <ButtonContainer>

        <PlayButton  onClick={()=>this.startPlaying()} type="button">
          <Icon> <i className={`fa fa-${icon}`} /> </Icon>
        </PlayButton>

      </ButtonContainer>

    );
  }


}

const Container =  styled.div`
    position: relative;
`;

const  PlayButton = styled.button`
    height: 100%;
    width: 45%;
    border-radius: 50%;
    background-color: #fff;
    outline: none;
    border-color: #2D2D2D;
    border: .5%;
    cursor: pointer;
  `;
PlayButton.displayName = 'PlayButton';

const ButtonContainer =styled.div`
    position: absolute;
    height: 13%;
    width: 18%;
    z-index: 2;
    top: 35%;
    left: 55%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  `;
ButtonContainer.displayName = 'ButtonContainer';

const Icon = styled.button`
  margin-left: 5%;
  color: #2D2D2D;
  border: none;
  font-size: 2vw;
  cursor: pointer;

`;
Icon.displayName = 'Icon';





export default PlayPauseBtn;
