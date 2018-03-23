import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import config from '../../config/config';

export default class PlayerTracker extends React.Component {

  constructor(props) {
    super(props);

    console.log(props, 'Props in playertracker');

    this.state = {
      playerTime: 0,
      interval: '',
      playing: false,
    };

    this.playComment = this.playComment.bind(this);
    this.timer = this.timer.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextState);
  //   if (nextState.playing != this.state.playing) {
  //     return true;
  //   }
  //
  //   else {
  //     return false;
  //   }
  // }

  playComment(playerTime) {

    if (this.state.playing == true) {
      clearInterval(this.state.interval); //if state is playing, user intent was to pause. so clear interval
    }

    this.setState(prevState => ({playing: !prevState.playing, playerTime: playerTime}));
  }

  timer(incoming) {

    var myValue = this.state.playerTime;
    myValue= myValue+ 0.025;
    //console.log(myValue, 'PLAYER TIME IN TIMER FUNCTION');
    //return myValue;
    this.setState({playerTime: myValue});
  }

  render() {

    var myValue = '';
    let playPauseIcon = 'fa fa-play';

    if (this.state.playing) {
      myValue= setTimeout(() => this.timer(), 25);
    }

    if (myValue > (this.props.duration - 0.0001)) {
      clearInterval(this.state.interval);
    }
    return (
      <div style={{width: 'inherit', color: 'steelblue', background: 'none', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between'}}>
        <PlayIcon onClick ={() => this.playComment(myValue)}> <i className={playPauseIcon} /> </PlayIcon>
        <Input type="range"  mim="0" max={this.props.duration} step="1" value={this.state.playerTime} />
        <ReactPlayer url ={config.streamingUrl+ this.props.url}
          style={{display: 'none'}}
          playing = {this.state.playing} />
      </div>
    );
  }
}

const Input = styled.input`

 -webkit-appearance : none;
width: 100%;
background: transparent;

::-webkit-slider-thumb { //styling the thumb for chrome
  -webkit-appearance: none;
  border: none;
  height: 1vw;
  width: 1vw;
  border-radius: 1vw;
  cursor: pointer;
   margin-top: -0.4vw;
  background-color: #009CFF;
}

::-moz-range-thumb { //styling the thumb for firefox
  border: none;
  height: 1vw;
  width: 1vw;
  border-radius: 1vw;
  cursor: pointer;
  background-color: #009CFF;
}

::-ms-thumb { //same stuff for IE
  border: none;
  height: 1vw;
  width: 1vw;
  border-radius: 1vw;
  cursor: pointer;
  //margin-top: -1vw;
  background-color: #009CFF;
}
:focus {
  outline: none;
}

::-webkit-slider-runnable-track {
  width: 100%;
  height: 0.15vw;
  cursor: pointer;
  background-color: #969595;
  border: none;
  margin-top: -0.5vw;
}

:focus::-webkit-slider-runnable-track {
  background: orange;
}

::-moz-range-track {
  width: 100%;
  height: 0.15vw;
  cursor: pointer;
  background-color: #969595;
  border: none;
}

::-ms-track {
  width: 100%;
  height: 1vw;
  cursor: pointer;
  background: orange;
  border-radius: 1vw;
  border: none;
}

::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

:focus::-ms-fill-lower {
  background: blue;
}

::-ms-fill-upper {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

:focus::-ms-fill-upper {
  background: blue;
}


`;

const PlayIcon = styled.button`

  font-size: 1.75vw;
  flex: 1;
  border: none;
  align-self: stretch;
  padding: 0.75vw;
  border-top: solid 0.05vw #009CFF;
  text-align:center;
  background: none;font-size: 1vw;
  flex: 0;
  border-top: none;
  padding: 0.4vw;
  color: #969595
`;
