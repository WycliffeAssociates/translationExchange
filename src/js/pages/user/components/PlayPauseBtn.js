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
    height: 11vh;
    width: 6.4vw;
    border-radius: 8vw;
    background-color: #fff;
    outline: none;
    border-color: #2D2D2D;
    border: .5%;
    cursor: pointer;
  `;

const ButtonContainer =styled.div`
    position: absolute;
    width: 18vw;
    z-index: 2;
    top: 39vh;
    left: 56vw;
    transform: translate(-50%, -50%);
    cursor: pointer;
  `;

const Icon = styled.button`
  margin-left: 5%;
  color: #2D2D2D;
  border: none;
  font-size: 2vw;
  cursor: pointer;
  background-color:transparent;

`;





export default PlayPauseBtn;
