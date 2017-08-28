import React, { Component } from 'react';
import WaveForm from './Waveform';
import{ PauseButton, PlayButton, MultipleTakesButton } from './buttons';
import TimeContainer from './timeContainer';
import Marker from './Markers';





class AudioPlayer extends Component {


constructor(props){
  super(props);

  this.state = {play: false,
                finishedPlaying: false,
                durationTime: 0,
                updateTime: 0,
                initialWidth: 0,
                showMarkers: false,
                markerPosition: 0,
                markerClicked: false,
                audioFile: [],
                audioName:[],
                nextAudio: false


  }
  this.toggleButton = this.toggleButton.bind(this);
  this.updateTime = this.updateTime.bind(this);
  this.durationTime = this.durationTime.bind(this);
  this.initialWidth = this.initialWidth.bind(this);
  this.callMarker = this.callMarker.bind(this);
  this.dragPosition = this.dragPosition.bind(this);
  this.finishedPlaying = this.finishedPlaying.bind(this);
  this.keepPlaying = this.keepPlaying.bind(this);
  this.nextAudio = this.nextAudio.bind(this);


}

componentWillReceiveProps(nextProps) {
  const obj = nextProps.playlist;
//  console.log(obj);

  for (const key in obj) {

        this.setState(prevState => ({
    audioFile: [...prevState.audioFile, obj[key].src],
    audioName: [...prevState.audioName, obj[key].name]

}));


  }

}

componentDidMount () {
   this.setState({ initialWidth: this.rangeInput.offsetWidth });
   this.getAudioAndName();
   //console.log(this.props.playlist)
 }

toggleButton(){
this.setState({play: !this.state.play});
}

updateTime(updateTime) {
  this.setState({updateTime});
}
durationTime(durationTime) {
  this.setState({ durationTime });
}
initialWidth(initialWidth){
  this.setState({ initialWidth });
}

dragPosition(markerPosition) {
  const timePosition = (markerPosition * this.state.durationTime) / this.state.initialWidth;

  this.setState({ markerPosition: timePosition,
                  updateTime: timePosition,
                  markerClicked: true,
                play: true

   });



  }

getAudioAndName(){
  const obj = this.props.playlist;


  for (const key in obj) {

        this.setState(prevState => ({
    audioFile: [...prevState.audioFile, obj[key].src],
    audioName: [...prevState.audioName, obj[key].name]

}));


  }
}

callMarker() {
  const markerArray = [];
  // console.log('Timeline props', this.props.markers);
  // console.log('local props', markerObj.markers);
     const receivedMarkerObject = this.props.markers;
  //  const receivedMarkerObject = markerObject.markers;

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
finishedPlaying(check){
this.setState({finishedPlaying: check,
                play: false });

}

nextAudio(check){
this.setState({nextAudio: check});

}

keepPlaying(check){
  this.setState({play: true});

}


  render() {




     const updateTime = this.state.updateTime;

     let markers = '';
     let Button = <PlayButton onClick = {this.toggleButton}/> ;
     if (this.state.play){
      Button = <PauseButton onClick = {this.toggleButton}/>
     }
     if(this.props.multipleTakes){


     }

     if(this.state.showMarkers){
        markers = this.callMarker(); }



    return (
      <div className="ParentContainer" style={styles.container}>
          {Button}



       <div ref={input => this.rangeInput = input} className="waveform & Markers Container" style={styles.waveformContainer}>
          {markers}
          <WaveForm
            audioFile = {this.state.audioFile}
            playAudio = {this.state.play}
            durationTime={this.durationTime}
            updateTime = {this.updateTime}
            initialWidth = {this.initialWidth}
            markerPosition= {this.state.markerPosition}
            markerClicked={this.state.markerClicked}
            resetMarkerClicked={this.resetMarkerClicked}
            finishedPlaying = {this.finishedPlaying}
            nextAudio ={this.nextAudio}
            keepPlaying = {this.keepPlaying}
            looping = {true}                                                 // property to use when stiching takes
                                 />




       </div>

           <TimeContainer
            audioLength={this.state.durationTime}
            updatedTime = {updateTime}
            markerBtnClicked ={()=> this.setState({showMarkers:!this.state.showMarkers})}
            audioName= {this.state.audioName}
            nextAudio={this.state.nextAudio}          />

        </div>


    );
  }
}

const styles = {

   container:{
       display: 'flex',
       backgroundColor: '#000',
       height: 150,
       flexDirection: 'row',
       flex: '1 1 0'


   },
   waveformContainer:{
    position: 'relative',
    alignSelf: 'center',
    flex: '1 1 auto',
    marginLeft: 20

  },
  markerContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    width:'100%',
    height: '100%'


  }


}

export default AudioPlayer;
