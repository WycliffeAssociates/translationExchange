import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import config from '../../config/config';

export default class PlayerTracker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerTime: 0,
      interval: '',
      playing: false,
      url: null,
      loop: false,
      loaded: 0,
      duration: 0,
      played: 0,
    };

    this.playComment = this.playComment.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onSeek = this.onSeek.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.PlayHead = this.PlayHead.bind(this);
  }

  playComment(playerTime) {
    this.setState(prevState => ({playing: !prevState.playing, playerTime: playerTime}));
  }

  onProgress = state => {
    console.log('onProgress', state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  onSeek(e) {
    // this.setState({ played: parseFloat(e.target.value) });
    this.player.seekTo(parseFloat(e.target.value));
  }

  onEnd() {
    this.setState({ playing: this.state.loop , played: 0, playedSeconds: 0});
  }

  ref = player => {
    this.player = player;
  }

  PlayHead() {

    let playing = this.state.playing;

    return (
      <div>
        <PlayIcon style={{display: playing? 'none': ''}} onClick ={() => this.playComment()}> <i className="fa fa-play" /> </PlayIcon>

        <PlayIcon style={{display: playing? '': 'none'}} onClick ={() => this.playComment()}> <i className="fa fa-pause" /> </PlayIcon>

      </div>);

  }
  render() {



    return (
      <div>

        <div style={{width: 'inherit', color: 'steelblue', background: 'none', display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between'}}>
          {this.PlayHead()}
          <Input type="range"  min="0" max ={1} step="0.01" value={this.state.played? this.state.played: 0}
            onChange = {this.onSeek} />
          <ReactPlayer //url ={config.streamingUrl+ this.props.url}
            url ={config.streamingUrl+ this.props.url}
            style={{display: 'none'}}
            onProgress = {this.onProgress}
            playing = {this.state.playing}
            onEnded = {this.onEnd}
            ref={this.ref}
          />
        </div>
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
