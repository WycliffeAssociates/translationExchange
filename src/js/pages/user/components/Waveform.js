import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';
import PlayPauseBtn from './PlayPauseBtn';

class CommentsPlayer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      play: false,
      pos: 0,
    };

    this.handlePosChange = this.handlePosChange.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0],
    });
  }

  toggleButton() {
    this.setState({ play: !this.state.play });
  }

  finishedPlaying() {

    this.setState({ play: false, pos: 0 });

  }

  render() {
  const{ pos, play} = this.state;

    return (
      <div style={styles.container} >
        <div style={styles.waveformContainer}>
          <Wavesurfer
            audioFile={this.props.audioFile}
            pos={pos}
            onPosChange={this.handlePosChange}
            playing={this.state.play}
            options={{ cursorWidth: 2, progressColor: '#eff0f2', cursorColor: 'transparent', barWidth: 4, hideScrollbar: true, normalize: true, height: 60, waveColor: '#3791D5' }}
            onReady={this.duration}
            onFinish={this.finishedPlaying}
          />
        </div>
        <PlayPauseBtn startPlaying= {()=>this.toggleButton()} playing={play} />

      </div>

    );
  }
}



const styles = {

  container: {
    display: 'flex',
    alignSelf: 'center',
    flex: '1 1 auto',
    width: '100%',
    paddingTop: '14%',
    marginLeft: '5%'
  },
  waveformContainer: {
    width: '100%',
  },

};
export default CommentsPlayer;
