import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { playAudio, stopAudio, finishedPlaying, updateTime, takeId } from '../../../../actions';
import WaveForm from './Waveform';
import { PauseButton, PlayButton } from './buttons';
import TimeContainer from './timeContainer';
import Marker from './Markers';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      finishedPlaying: false,
      durationTime: 0,
      updateTime: 0,
      initialWidth: 0,
      showMarkers: true,
      markerPosition: 0,
      markerClicked: false,
      audioFile: '',
      audioName: '',
      nextAudio: false,
      pointer: 1,
      markers: this.props.markers,
      looping: false,                   // state used to keep playing takes when playlist mode is on
    };
    //  this.toggleButton = this.toggleButton.bind(this);
    //this.updateTime = this.updateTime.bind(this);
    this.durationTime = this.durationTime.bind(this);
    this.initialWidth = this.initialWidth.bind(this);
    this.callMarker = this.callMarker.bind(this);
    this.dragPosition = this.dragPosition.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.resetMarkerClicked = this.resetMarkerClicked.bind(this);

  }

  componentWillMount() {
    this.setState({
      audioFile: this.props.playlist[0].src,
      audioName: this.props.playlist[0].name,
      markers: this.props.playlist[0].markers,
    });
  }

  componentDidMount() {
    this.setState({ initialWidth: this.rangeInput.offsetWidth });
    window.addEventListener('resize', this.updateDimensions.bind(this));

  }

  updateDimensions() {
    if (this.rangeInput !== null) {
      this.setState({ initialWidth: this.rangeInput.offsetWidth });   // updates marker position when the window is resized
    }

  }

  durationTime(durationTime) {

    this.setState({ durationTime });

    if (this.state.looping) {
      this.props.playAudio();
    }

    this.props.updateTime(0);                // fixes the small bug of not reseting the timer to zero if the plus is clicked while playing a different take

  }
  initialWidth(initialWidth) {
    this.setState({ initialWidth });
  }

  dragPosition(markerPosition) {
    const timePosition = (markerPosition * this.state.durationTime) / this.state.initialWidth;
    //this.props.updateTime(timePosition);

    this.setState({
      markerPosition: timePosition,
      markerClicked: true,


    });

    this.props.playAudio();

  }



  callMarker() {
    const markerArray = [];

    let receivedMarkerString = this.props.playlist[0].markers;

    let receivedMarkerObject = JSON.parse(receivedMarkerString);


    if (this.props.playlistMode) {
      receivedMarkerObject = JSON.parse(this.state.markers);
    }


    for (const key in receivedMarkerObject) {

      const position = ((receivedMarkerObject[key] / 44100) / (this.state.durationTime)) * this.state.initialWidth;
      markerArray.push(<Marker
        style={{ overflow: 'visible' }}
        visibility={true}
        translate={position}
        text={key}
        key={key}
        dragPosition={this.dragPosition}
      />);
    }
    return (
      markerArray
    );
  }



  finishedPlaying() {

    let i = this.state.pointer;
    const playlistLength = this.props.playlist.length;
    if (i < playlistLength) {
      this.setState({
        audioFile: this.props.playlist[i].src,
        audioName: this.props.playlist[i].name,
        markers: this.props.playlist[i].markers,
        pointer: this.state.pointer + 1,
        looping: true,

      });
      this.props.takeId(i);

    }
    else {
      this.setState({
        audioFile: this.props.playlist[0].src,
        audioName: this.props.playlist[0].name,
        markers: this.props.playlist[0].markers,
        pointer: 1,
        looping: false,

      });
      this.props.takeId(0);
      this.props.stopAudio();
    }


  }

  resetMarkerClicked(statement) {
    this.setState({ markerClicked: statement });

  }

  render() {
    let src = this.props.playlist[0].src;
    let takeInfo = this.props.playlist[0].name;

    if (this.props.playlistMode) {
      src = this.state.audioFile;
      takeInfo = this.state.audioName;
    }


    //const updateTime = this.state.updateTime;

    let markers = '';
    let Button = <PlayButton onClick={() => this.props.playAudio()} />;
    if (this.props.play) {
      Button = <PauseButton onClick={() => this.props.stopAudio()} />;
    }

    if (this.state.showMarkers) {
      markers = this.callMarker();
    }

    return (
      <div className="ParentContainer" style={styles.container}>
        {Button}

        <div ref={input => this.rangeInput = input} className="waveform & Markers Container" style={styles.waveformContainer}>
          {markers}
          <WaveForm
            audioFile={src}
            playAudio={this.props.play}
            durationTime={this.durationTime}
            //updateTime = {this.updateTime}
            //initialWidth = {this.initialWidth}
            markerPosition={this.state.markerPosition}
            markerClicked={this.state.markerClicked}
            resetMarkerClicked={this.resetMarkerClicked}
            finishedPlaying={this.finishedPlaying} />
          <div style={{ marginTop: 5 }}>{takeInfo}</div>
        </div>
        <TimeContainer
          audioLength={this.state.durationTime}
          updatedTime={this.props.updatedTime}
          markerBtnClicked={() => this.setState({ showMarkers: !this.state.showMarkers })}
          audioName={this.state.audioName}
          nextAudio={this.state.nextAudio} />
      </div>
    );
  }

}

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#000',
    height: 125,
    flexDirection: 'row',
    flex: '1 1 0',
  },
  waveformContainer: {
    position: 'relative',
    alignSelf: 'center',
    flex: '1 1 auto',
    marginLeft: 20,
  },
  markerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
};

const mapStateToProps = state => {
  const { play, updatedTime } = state.setAudioPlayerState;
  const { playlist, playlistMode } = state.updatePlaylist;

  return { play, playlist, playlistMode, updatedTime };

};

const mapDispatchToProps = dispatch => {

  return bindActionCreators({
    finishedPlaying,
    playAudio,
    stopAudio,
    updateTime,
    takeId,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
