import React, {Component} from 'react';
import { Icon } from "semantic-ui-react";
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
          <Icon style={styles.iconStyle} size="big" name={icon} />
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
    width: 100%;
    border-radius: 80%;
    background-color: #fff;
    outline: none;
    border-color: #2D2D2D;
    border: .5%;
  `;

const ButtonContainer =styled.div`
    position: absolute;
    height: 13%;
    width: 18%;
    zIndex: 2;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;
const styles = {

  iconStyle: {
    marginLeft: '5%',
    color: '#2D2D2D',
  },
};




export default PlayPauseBtn;
