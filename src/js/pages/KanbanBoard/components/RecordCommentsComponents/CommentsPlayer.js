import React, { Component } from 'react';
import styled from 'styled-components';
import PlayerTracker from '../../../../components/PlayerTracker';

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
    this.duration = this.duration.bind(this);
  }

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0],
    });
  }

  duration() {

    if (this.props.pointer > 0) {
      this.setState({ play: true });
    }
  }

  toggleButton() {
    this.setState({ play: !this.state.play });
  }

  finishedPlaying() {

    this.setState({ pos: 0, play: false });
    if (this.props.loop) {
      this.props.playNext(true);
    }
  }

  render() {
    return (
      <Container >
        <PlayerTracker audioFile={this.props.audioFile} />
        {/* <BlockMiddle></BlockMiddle> */}
      </Container>

    );
  }
}

const Container = styled.div`
  padding-right: 1vw;
  width: 8vw;
  display:flex;
  justify-content: space-around;
`;

export default CommentsPlayer;
