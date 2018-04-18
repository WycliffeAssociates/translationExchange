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
          <Icon><i className="material-icons" style={{fontSize:'40px'}}>{icon}</i> </Icon>
        </PlayButton>
      </ButtonContainer>
    );
  }


}

const Container =  styled.div`
    position: relative;
`;

const  PlayButton = styled.button`
    height: 90px;
    width: 90px;
    border-radius: 50px;
    background-color: #fff;
    outline: none;
    border-color: #2D2D2D;
    border: .5%;
    cursor: pointer;
  `;
PlayButton.displayName = 'PlayButton';

const ButtonContainer =styled.div`
    width:100%;
    z-index: 2;
    display:flex;
    justify-content:center;
    cursor: pointer;
    margin-top:100px
  `;
ButtonContainer.displayName = 'ButtonContainer';

const Icon = styled.button`
  color: #2D2D2D;
  border: none;
  cursor: pointer;
  background-color:transparent;
`;
Icon.displayName = 'Icon';





export default PlayPauseBtn;
