import React, {Component} from 'react';
import styled from 'styled-components';



class PlayPauseBtn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: 'play_arrow',

    };
    this.startPlaying = this.startPlaying.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.playing) {
      this.setState({icon: 'play_arrow'});
    }
  }


  startPlaying() {
    this.props.startPlaying();

    if (this.props.playing) {
      this.setState({icon: 'play_arrow'});
    } else {

      this.setState({icon: 'pause'});
    }

  }

  render() {
    const {icon}= this.state;
    return (
      <ButtonContainer>
        <PlayButton  onClick={()=>this.startPlaying()} type="button">
          <Icon className="material-icons">{icon} </Icon>
        </PlayButton>
      </ButtonContainer>
    );
  }


}

const PlayButton = styled.button`
    height: 6vw;
    width: 6vw;
    border-radius: 5vw;
    background-color: #fff;
    outline: none;
    border-color: #2D2D2D;
    cursor: pointer;
    padding: 0;
  `;
PlayButton.displayName = 'PlayButton';

const ButtonContainer = styled.div`
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-top: -3vw;
  `;
ButtonContainer.displayName = 'ButtonContainer';

const Icon = styled.i`
  color: #2D2D2D;
  border: none;
  cursor: pointer;
  background-color:transparent;
  font-size: 5vw;
`;
Icon.displayName = 'Icon';





export default PlayPauseBtn;
