import React, {Component} from 'react';
import { Icon } from "semantic-ui-react";



class PlayPauseBtn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: 'play',

    }
    this.startPlaying = this.startPlaying.bind(this);
  }


startPlaying() {
    this.props.startPlaying();
    console.log(this.props.playing)
    if (this.props.playing) {
      this.setState({icon:'play'})
    } else {

      this.setState({icon:'pause'})
    }

}

render() {
  const {icon}= this.state;;
  return(
  <div style = {styles.buttonContainer}>
    <button style = {styles.playButton}  onClick={()=>this.startPlaying()} type="button">
      <Icon style={styles.iconStyle} size="big" name={icon} />
    </button>
  </div>

)
}


};


const styles = {
  container: {
    position: 'relative'
  },

  playButton:{
    height: '100%',
    width: '100%',
    borderRadius: '80%',
    backgroundColor: '#fff',
    outline: 'none',
    borderColor: '#2D2D2D',
    border: '.5%'
  },
  iconStyle:{
    marginLeft: '5%',
    color: '#2D2D2D'
  },
  buttonContainer:{
    position: 'absolute',
    height: '15%',
    width: '18%',
    zIndex: 2,
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }

}




export default PlayPauseBtn;
