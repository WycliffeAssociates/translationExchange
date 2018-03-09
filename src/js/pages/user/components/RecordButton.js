import React, {Component} from 'react';
import { Icon } from "semantic-ui-react";
import ReactCountdownClock from "react-countdown-clock";


class RecordButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0

    }
    this.startRecording = this.startRecording.bind(this);
  }

compo

startRecording() {
  this.setState( {counter: 3} );
  this.props.startRecording()
}

render() {
  return (
    <div style= {styles.container}>
      <div style = {styles.buttonContainer}>
        <button style = {styles.playButton}  onClick={this.startRecording} type="voice">
          <Icon style={styles.iconStyle} size="big" name="play" />
        </button>
      </div>

      <ReactCountdownClock seconds={this.state.counter}
        color="#E74C3C"
        alpha={0.9}
        size={100}
      />


    </div>
  );
}


}


const styles = {
  container: {
    position: 'relative',
  },

  playButton: {
    height: '100%',
    width: '100%',
    borderRadius: '80%',
    backgroundColor: '#fff',
    outline: 'none',
    borderColor: 'transparent',


  },
  iconStyle: {
    marginLeft: '5%',
    color: '#E74C3C',
  },
  buttonContainer: {
    position: 'absolute',
    height: '70%',
    width: '70%',
    zIndex: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

};




export default RecordButton;
