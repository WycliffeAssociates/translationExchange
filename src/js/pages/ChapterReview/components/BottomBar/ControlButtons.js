import React from 'react';
import styled from 'styled-components';

export default class ControlButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      takesPlaying: false,
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.skip = this.skip.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stopPlaying === true) {
      this.togglePlay();
    }
  }
  togglePlay() {
    const {takesPlaying} = this.state;
    if (!takesPlaying) {
      this.props.togglePlay(true);
    }
    else {
      this.props.togglePlay(false);
    }
    setTimeout(() => this.setState((prevState) => ({ takesPlaying: !prevState.takesPlaying})), 100);
  }

  skip(direction) {
    let index='';
    const {takesPlaying} = this.state;
    const {activeChunkIndex, selectedTakesLength} = this.props;
    if (direction === 'forward') {
      index= activeChunkIndex + 1;
      if (index < selectedTakesLength) {
        this.props.updateActiveChunkIndex(activeChunkIndex, index, takesPlaying);
        this.props.resetTake(true);
      }
    }
    else if (direction === 'previous') {

      index= activeChunkIndex - 1;
      if (index >= 0) {
        this.props.updateActiveChunkIndex(activeChunkIndex, index, takesPlaying);
        this.props.resetTake(true);
      }
    }
  }


  render() {
    const {takesPlaying} = this.state;
    let icon = <i className="material-icons">play_arrow</i>
    if (takesPlaying) {
      icon = <i className="material-icons">pause</i>
    }

    return (
      <Container>

        <SkipPrevious onClick={() => this.skip('previous')}> <i className="material-icons">skip_previous </i> </SkipPrevious>
        <PlayButton onClick={this.togglePlay}> {icon}</PlayButton>
        <SkipNext onClick={() => this.skip('forward')}> <i className="material-icons">skip_next </i></SkipNext>


      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 30%;

`;


const PlayButton = styled.button`
  height: 6vh;
  width: 6vh;
  border-radius: 100px;
  background:linear-gradient(to top left, #0076FF, #00C5FF);
  color: white;
  border: none;
  box-shadow: 0px 3px 3px rgba(0,0,0,0.5);
  i {
    font-size: 36px;
    vertical-align: middle;
  }
`;

const SkipPrevious = styled(PlayButton)`
  background: #39414A;
`;


const SkipNext = styled(PlayButton)`
  background: #39414A;
`;
