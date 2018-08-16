import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import Waveform from '../../components/audioplayer/Waveform';
import Marker from '../../components/audioplayer/Markers';
import config from '../../../../../config/config';
import BottomButtons from './BottomButtons';


export default class TakeCard extends React.Component {

  constructor(props) {
    super(props);

    this.state= {
      takePlaying: false,
      showMarkersColor: '',
      hash: 'randomhash4324',
      pos: 0,
      width: 0,
      height: 0,

    };

    this.callMarker  = this.callMarker.bind(this);
    this.playTakeFromCard = this.playTakeFromCard.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.dragPosition = this.dragPosition.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.trackPos = this.trackPos.bind(this);
  }


  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    if (this.props.id !== this.props.playingTakeId) {
      this.setState({takePlaying: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.playingTakeId) {
      this.setState({takePlaying: false});
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  dragPosition(position) {
    this.setState({pos: position, takePlaying: true});
  }

  trackPos(pos) {
    this.setState({pos: pos});
  }
  finishedPlaying() {
    this.setState({takePlaying: false,
      pos: 0});

  }

  playTakeFromCard() {
    const {playTake} = this.props;
    playTake(this.props.id);
    this.setState(prevState => ({takePlaying: !prevState.takePlaying}));
  }


  callMarker() {
    const markerArray = [];

    let receivedMarkersString = this.props.markers;

    let receivedMarkerObject = JSON.parse(receivedMarkersString);

    for (const key in receivedMarkerObject) {
      const position = (receivedMarkerObject[key] / 44100);
      const finalPosition = (position/this.props.duration)*100;
      // calculate the position of the marker
      // by dividing the marker position from the props, by the duration of the take
      // * by 100 and use that percatage to place the marker on the card in correct place
      // offset by 4 to account for the padding inside the taskList. If remove 4, marker moves all the way to the left
      //of the container, beyond the take card.
      markerArray.push(
        <Marker
          style={{ overflow: 'visible'}}
          visibility={true}
          translate={finalPosition}
          markerTime = {position}
          text={key}
          key = {key}
          dragPosition={this.dragPosition}
        />);
    }

    return (
      markerArray
    );
  }

  render() {
    let markers ='';
    const {pos} = this.state;
    markers = this.callMarker();

    const { isDragging, onDeleteQueue} = this.props;


    return  ( //only native element nodes can now be passed to React DnD connectors
      <div style={{opacity: isDragging? 0.5: 1, display: onDeleteQueue? 'none': ''}} >
        <TopBar {...this.props} />

        <MarkerContainer>
          {markers}
        </MarkerContainer>

        <WaveformContainer>
          <Waveform
            audioFile={config.streamingUrl+this.props.location}
            playing = {this.state.takePlaying} durationTime={this.props.duration}
            trackPos = {this.trackPos}
            pos = {pos}
            finishedPlaying={this.finishedPlaying}
            options= {{ cursorWidth: 2, progressColor: '#009CFF', cursorColor: '#E74C3C', barWidth: 1, hideScrollbar: true, normalize: true, height: 35, waveColor: '#969595' }}
          />
        </WaveformContainer>

        <BottomButtons {...this.props} width={this.state.width} takePlaying= {this.state.takePlaying} playTakeFromCard = {() => this.playTakeFromCard()} expandComments={() => this.props.expandComments()} />



      </div>
    );
  }

}

const MarkerContainer= styled.div`
margin-bottom: 2vh;
position:relative;
`;
MarkerContainer.displayName = 'MarkerContainer';

const WaveformContainer = styled.div`
  height:3vw;
  margin-bottom: 0.5vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
`;
WaveformContainer.displayName = 'WaveformContainer';
