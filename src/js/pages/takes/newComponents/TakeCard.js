import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import {ReactMic} from 'react-mic';
import ReactPlayer from 'react-player';
import Wave from '../components/audioplayer/Waveform';
import AudioPlayer from '../components/audioplayer/AudioPlayer';
import {connect} from 'react-redux';
import config from 'config/config';
import { addToPlaylist, playTake, multipleTakes, clearPlaylist, removeTakeFromPlaylist, stopAudio, updateTime, playAudio } from '../../../actions';
import { bindActionCreators } from 'redux';


export class TakeCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      takePlaying: false,
      recording: false,
      blob: '',
      isToggleOn: true,
      showMarkers: false,
      showMarkersColor: '',
      playlist: [],
      clear: true,
      hash: 'randomhash4324',
    };

    this.handleClick = this.handleClick.bind(this);
    this.onStop = this.onStop.bind(this);
    this.recordButtonClick = this.recordButtonClick.bind(this);
    this.recordButton = this.recordButton.bind(this);
    this.play = this.play.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.renderJdenticon = this.renderJdenticon.bind(this);

  }

  componentDidMount() {
    jdenticon.update(this.state.hash);
  }

  componentWillMount() {
    jdenticon.update('randomhash4324');
  }

  handleClick(caller) {
    if (caller === 'comment') {
      this.setState(prevState => ({ showComments: !prevState.showComments}));
    }

    else if (caller === 'play') {
      this.setState(prevState => ({takePlaying: !prevState.takePlaying}));
    }
  }

  recordButtonClick() {
    if (this.state.recording == false) {
      this.setState(prevState => ({recording: !prevState.recording}));
    }

    else {
    //  this.onStop();
      this.setState(prevState => ({recording: !prevState.recording}));
    }
  }

  onStop(recordedBlob) {
    console.log(recordedBlob);
    this.setState({blob: recordedBlob.blobURL});

  }

  renderJdenticon() {
    jdenticon.update(this.state.hash);
    return (
      <Icon data-jdenticon-value={this.state.hash} />);

  }

  recordButton() {
    const recording = this.state.recording;
    const microphone = <i className = "fa fa-microphone" />;
    const stop = <i className = "fa fa-stop" />;

    return (
      <div style={{backgroundColor: '#E74C3C', width: '4vw'}}>

        <RecordComment style={{ display: recording? '': 'none'}} onClick = {this.recordButtonClick}>
          {stop}
        </RecordComment>

        <RecordComment style={{ display: recording? 'none': ''}} onClick = {this.recordButtonClick}>
          {microphone}
        </RecordComment>

      </div>

    );
  }

  finishedPlaying() {
    this.setState({takePlaying: false});
    console.log(this.state.takePlaying, 'finished Playing');
  }
  moveLeft() {
    if (this.props.take.is_publish) {
      this.props.onMarkedForExportToggled();
    } else if (this.props.take.rating > 1) {
      this.props.onRatingSet(this.props.take.rating - 1);
    }
  }

  moveRight() {
    if (this.props.take.rating >= 3) {
      this.props.onMarkedForExportToggled();
    } else if (this.props.take.rating < 1) {
      this.props.onRatingSet(2);
    } else {
      this.props.onRatingSet(this.props.take.rating + 1);
    }
  }

  getTakeInfo() {
    const takeLoc = this.props.take.location;
    const takeNum = this.props.count;
    const startv = this.props.chunkNumber;
    const author =  'author';    // TODO include autor from backend this.props.author.name;
    const date = this.parseDate(this.props.take.date_modified);
    const markers = this.props.take.markers;

    let take = {
      src: config.streamingUrl + takeLoc,
      markers: markers,
      name: `${this.props.displayText.take} ${takeNum}, ${this.props.displayText.chunk} ${startv}  (${author} ${this.props.displayText.on} ${date})`,  // in case of other mode like chunk mode or verse mode verify this
      id: takeLoc,
      chunk: `${this.props.displayText.chunk} ${startv}`,          // in case of a different mode like segment or verse here is assumed that only chunks will be used
    };
    return take;
  }

  playTakeFromCard() {

    this.setState(prevState => ({takePlaying: !prevState.takePlaying}));
    //
    // if (!this.props.playlistMode) {                           // checks if it is on playlist mode, so when is true it does not play audio from the card
    //   this.props.stopAudio();
    //   const take = this.getTakeInfo();
    //   this.props.playTake(take);
    // }

  }

  removeFromPlaylist() {
    const takeLocation = this.props.take.location;

    this.props.playlist.map((i, index) => {         // loop inside the object to find an unique identifier in order to get the index of the object to proceed and delete it
      if (i.id === takeLocation) {
        this.props.stopAudio();       // solve bug of removing the take playing,
        this.props.removeTakeFromPlaylist(index);
        //this.props.playAudio();
      }
      return null; // added to satisfy warning of return expected on arrow function
    });

  }


  addToPlaylist() {
    const take = this.getTakeInfo();

    if (!this.props.playlistMode) {                        // the first time called the function playlist mode is false so we clear the playlist info from the single take mode
      this.props.clearPlaylist();
    }

    if (this.state.addButtonIcon !== 'plus') {
      this.setState({ addButtonIcon: 'plus' });
      this.removeFromPlaylist();

      if (this.props.playlist.length < 1) {
        this.props.multipleTakes(false);
        this.props.playTake(take);          // add the last take played to the playlist
      }

    }
    else {
      this.props.stopAudio();
      this.setState({ addButtonIcon: 'minus', clear: false });
      this.props.addToPlaylist(take);
      this.props.multipleTakes(true);         //used to check if there is a playlist so at the end of each take the audio keeps playing until
      // it reaches the last one

      if (this.props.playlist.length > 1) {   // conditional to do not play the take when it is added the first time to the playlist
        // this.props.playAudio();
      }

    }

  }

  play() {
    this.setState(prevState => ({play: !prevState.play}));
  }

  render() {

    let playPauseIcon = this.state.takePlaying? 'fas fa-pause fa-fw': 'fas fa-play fa-fw';
    let microphoneStopIcon = this.state.recording? 'fa fa-stop': 'fa fa-microphone';

    return (
      <Container>
        <TopBar>
          <DragIcon>
            <i className = "fa fa-bars" />
          </DragIcon>

          <CardInfo>
            <h3 style={{alignSelf: 'center'}}> {this.props.displayText.take} {this.props.count} </h3>
            <p style={{color: 'lightgray', fontStyle: 'italic', fontWeight: '100', marginTop: '-0.8vw'}}> 03/13/17 </p>
          </CardInfo>

          {this.renderJdenticon()}
        </TopBar>


        <Waveform>
          <Wave
            audioFile={config.streamingUrl+this.props.take.location}
            //audioFile="https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3"
            playAudio={this.props.play}
            playing = {this.state.takePlaying}

            durationTime={this.props.take.duration}
            //updateTime = {this.updateTime}
            //initialWidth = {this.initialWidth}
            markerPosition={this.state.markerPosition}
            markerClicked={this.state.markerClicked}
            resetMarkerClicked={this.resetMarkerClicked}
            finishedPlaying={this.finishedPlaying}
          />
        </Waveform>


        <BottomButtons>
          <CommentButton onClick={() => this.handleClick('comment')}>
            <span className="fa-layers fa-fw">
              <i className="fas fa-comment" />
              <span className="fa-layers-counter" style={{fontSize: '2.1vw', padding: '0.5vw'}}> 2 </span>
            </span>
          </CommentButton>


          <PlayTake onClick= {() => this.playTakeFromCard()}>
            <i className={playPauseIcon} /> {this.props.take.duration}s
          </PlayTake>
        </BottomButtons>


        {this.state.showComments?
          <Comments>
            <CommentRow>
              <Icon data-jdenticon-value={'random-randomhash4324'} />

              <div style={{display: 'flex', alignItems: 'flex-start', flex: '1'}}>
                <PlayComment onClick ={this.play}> <i className={playPauseIcon} /> </PlayComment>
                <ReactPlayer url={this.state.blob} playing ={this.state.play} style={{display: 'none'}} />

              </div>

              <RowButton> <i className = "fa fa-trash" /> </RowButton>
            </CommentRow>


            <MoreOptions>

              <LoadMore>
                <i className="fa fa-chevron-circle-down" />
                {`${' '}Load More`}
              </LoadMore>


              {this.recordButton()}

            </MoreOptions>
            {
            //  this.state.recording?
                // <ReactMic
                //   className = "sound-wave"
                //   record = {this.state.recording}
                //   onStop = {this.onStop}
                //   strokeColor="#009CFF"
                //   backgroundColor="transparent" />
            //   : ''
            }
          </Comments> :
          '' }



      </Container>

    );
  }

  parseDate(dateReceived) {

    let noon = 'am';
    let dateArr = dateReceived.split('T');
    let date = dateArr[0];

    var time = dateArr[1].split('.');
    time = time[0].split(':');
    date = date.split('-');
    switch (date[1]) {
      case '01':
        date[1] = this.props.displayText.month1;
        break;
      case '02':
        date[1] = this.props.displayText.month2;
        break;
      case '03':
        date[1] = this.props.displayText.month3;
        break;
      case '04':
        date[1] = this.props.displayText.month4;
        break;
      case '05':
        date[1] = this.props.displayText.month5;
        break;
      case '06':
        date[1] = this.props.displayText.month6;
        break;
      case '07':
        date[1] = this.props.displayText.month7;
        break;
      case '08':
        date[1] = this.props.displayText.month8;
        break;
      case '09':
        date[1] = this.props.displayText.month9;
        break;
      case '10':
        date[1] = this.props.displayText.month10;
        break;
      case '11':
        date[1] = this.props.displayText.month11;
        break;
      case '12':
        date[1] = this.props.displayText.month12;
        break;
      default:
        date[1]='';
        break;
    }

    let hour = parseInt(time[0], 10);
    if (hour / 12 > -1) {
      noon = 'pm';
    }

    if (!(hour % 12 === 0)) {
      hour %= 12;
    }

    return (`${date[1]} ${date[2]}, ${date[0]} ${this.props.displayText.at} ${hour}:${time[1]}${noon}`);
  }

}

const Container = styled.div`
background: white;
border-top: solid 0.04vw lightgray;
border-left: solid 0.04vw lightgray;
box-shadow: 3px 3px 3px 1px rgba(0,0,0,0.4);
width: 25vw;
height: inherit;
margin: 3vw;
border-radius: 0.3vw;
overflow: hidden;
border-bottom: none;

`;

const TopBar = styled.div`
  //height: 15%;
  display: flex;
  flex-direction: row;
  //align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

`;

const DragIcon = styled.button`
  border: none;
  font-size: 1.5vw;
  color: gray;
  background: none;

`;

const CardInfo = styled.div`
  margin-top: 0.8vw;
  text-align: center;
`;

const Icon = styled.svg`
  height: 2vw;
  width: 2w;
  background: steelblue;
  `;


const Waveform = styled.div`
  `;

const BottomButtons = styled.div`
 display: flex;
 flex-direction: row;
 align-items: stretch;
`;

const Button = styled.button`
  font-size: 1.75vw;
  border: none;
  align-self: stretch;
  flex: 1;
   padding: 0.75vw;
  border-top: solid 0.05vw #009CFF;
  text-align:center;
`;

const CommentButton = styled(Button)`
  color: #009CFF;
  background: white;
  text-decoration: underline;
`;

const PlayTake = styled(Button)`
  color: white;
  background: #009CFF;
  font-size: 1.2vw;
`;

const PlayComment = styled(Button)`
  font-size: 1vw;
  flex: 0;
  border-top: none;
  padding: 0.5vw;
`;


const Comments = styled.div`
padding-left: 1vw;
`;

const CommentRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 0.01vw lightgray;
  overflow: hidden;
`;

const RowButton = styled(Button)`
  flex:0;
  padding: 0,5vw;
  border-top: none;
  font-size: 1vw;
`;

const MoreOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

`;

const LoadMore = styled.label`
  font-size: 1vw;
  text-decoration: underline;
  color: #009CFF;
  font-weight: bold;
`;

const RecordComment = styled(Button)`
  background: none;
  color: white;
  flex: 0;
  font-size: 1.4vw;
  padding: 1vw 1.5vw;
  align-self: flex-end;
  border-top: none;

`;

const mapStateToProps = state => {
  const { mode, playlist, playlistMode } = state.updatePlaylist;
  const { displayText } = state.geolocation;
  return { mode, playlistMode, playlist, displayText };
};


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addToPlaylist,
    playTake,
    multipleTakes,
    clearPlaylist,
    removeTakeFromPlaylist,
    stopAudio,
    updateTime,
    playAudio,
  }, dispatch);

};


TakeCard.propTypes = {
  count: propTypes.number.isRequired,
  take: propTypes.object.isRequired,
  author: propTypes.string.isRequired,
  onRatingSet: propTypes.func.isRequired,
  onMarkedForExportToggled: propTypes.func.isRequired,
  takeId: propTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TakeCard);
