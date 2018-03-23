import React from 'react';
import styled from 'styled-components';

export default class PlayerTracker extends React.Component {

  constructor(props) {
    super(props);

    console.log(props, 'Props in playertracker');

    this.state = {
      playerTime: 0,
      interval: '',
      playing: !props.playing,
    };

  }

  componentDidMount() {
    if (this.state.playing == false) {
      this.state.interval = setInterval(() => {
        this.setState(prevState => ({playerTime: prevState.playerTime+ 0.025}));
      }, 25);
    }


  }

  componentWillReceiveProps(nextProps) {
    this.setState({playing: nextProps.playing});
  }
  //
  // componentDidUpdate() {
  //   console.log('called component did mount', this.state.playing);
  //
  //   if (this.state.playing == true) {
  //     this.state.interval = setInterval(() => {
  //       this.setState(prevState => ({playerTime: prevState.playerTime+ 0.025}));
  //     }, 25);
  //
  //   }
  //
  //   else {
  //     this.setState({interval: ''});
  //   }
  // }

  render() {

    let playPauseIcon = 'fa fa-play';
    if (this.state.playerTime > (this.props.duration - 0.0001)) {
      clearInterval(this.state.interval);
      //this.setState({playerTime: 0, interval: ''});
    }
    return (
      <div style={{width: 'inherit', color: 'steelblue', background: 'none', display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between'}}>
        <PlayIcon onClick ={this.props.playComment}> <i className={playPauseIcon} /> </PlayIcon>
        <Input type="range"  mim="0" max={this.props.duration} step="1" value={this.state.playerTime} />
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
