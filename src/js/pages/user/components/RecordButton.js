import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";
import styled from "styled-components";

class RecordButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    this.startRecording = this.startRecording.bind(this);
  }

  startRecording() {
    this.setState({ counter: 3 });
    this.props.startRecording();
  }

  render() {
    return (
      <Container>
        <ButtonContainer>
          <PlayButton onClick={this.startRecording} type="voice">
            <Icon>
              {" "}
              <i className="material-icons" style={{ fontSize: "5.1vw", marginLeft:"-1vw" }}>
                play_arrow
              </i>{" "}
            </Icon>
          </PlayButton>
        </ButtonContainer>

        <ReactCountdownClock
          seconds={this.state.counter}
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
  cursor: pointer;
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

const Icon = styled.button`
  margin-left: 5%;
  color: #e74c3c;
  border: none;
  font-size: 2vw;
  margin-left: -0.005vw;
  background-color: transparent;
  cursor: pointer;
`;

export default RecordButton;
