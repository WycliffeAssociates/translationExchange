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
                audioFile: '',
                audioName:'',
                nextAudio: false,
                pointer: 1



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
let i =0;

 this.setState({
  play:      false,
  audioFile:  nextProps.playlist[0].src,
  audioName:  nextProps.playlist[0].name

  });


}

componentDidMount () {
   this.setState({ initialWidth: this.rangeInput.offsetWidth });


 }

toggleButton(){
this.setState({play: !this.state.play, finishedPlaying: false});
}

updateTime(updateTime) {
  this.setState({updateTime});
}
durationTime(durationTime) {
  if (!this.props.multipleTakes){
      this.setState({ durationTime, play: this.props.play });
  }
this.setState({ durationTime});

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
                play: false,
                audioFile:  this.props.playlist[0].src,
                audioName:  this.props.playlist[0].name
                             });

         let i = this.state.pointer;
        console.log('pointer:' +  this.state.pointer);
        console.log('length'+ this.props.playlist.length);

   if(this.state.pointer === this.props.playlist.length){
    this.setState({play: false, pointer: 1});

   }

      if(this.props.playlist.length > 1 && i <  this.props.playlist.length  ){
       console.log(i);
        this.setState({
         play:      true,
         audioFile:  this.props.playlist[i].src,
         audioName:  this.props.playlist[i].name,
         pointer : this.state.pointer + 1

         });




       }





}

nextAudio(check){
//this.setState({nextAudio: check});

}

keepPlaying(check){
//  this.setState({play: true});

}



  render() {



  let src = ""

  if(this.state.audioFile !== null){

    src = this.state.audioFile;
  }


     const updateTime = this.state.updateTime;

     let markers = '';
     let Button = <PlayButton onClick = {this.toggleButton}/> ;
     if (this.state.play){
      Button = <PauseButton onClick = {this.toggleButton}/>
     }


     if(this.state.showMarkers){
        markers = this.callMarker(); }


    return (
      <div className="ParentContainer" style={styles.container}>
          {Button}



       <div ref={input => this.rangeInput = input} className="waveform & Markers Container" style={styles.waveformContainer}>
          {markers}
          <WaveForm
            audioFile = {src}
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
            <div style={{marginTop: 5}}>{this.state.audioName}</div>



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
