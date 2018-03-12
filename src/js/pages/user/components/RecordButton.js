import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react';
import ReactCountdownClock from 'react-countdown-clock';
import styled from 'styled-components';


class RecordButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,

    };
    this.startRecording = this.startRecording.bind(this);
  }



  startRecording() {
    this.setState( {counter: 3} );
    this.props.startRecording();
  }

  render() {
    return (
      <Container>
        <ButtonContainer>
          <PlayButton  onClick={this.startRecording} type="voice">
            <Icon style={styles.iconStyle} size="big" name="play" />
          </PlayButton>
        </ButtonContainer>

        <ReactCountdownClock seconds={this.state.counter}
          color="#E74C3C"
          alpha={0.9}
          size={100}
        />


      </Container>
    );
  }


}

const Container = styled.div`
  position: relative;
`;

const PlayButton = styled.button`
  height: 100%;
  width: 100%;
  border-radius: 80%;
  background-color: #fff;
  outline: none;
  border-color: transparent;
`;

const ButtonContainer = styled.div`
  position: absolute;
  height: 70%;
  width: 70%;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const styles = {
  iconStyle: {
    marginLeft: '5%',
    color: '#E74C3C',
  },
};




export default RecordButton;
