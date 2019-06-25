import React from 'react';
import styled from 'styled-components';

export default class ControlButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      takesPlaying: props.takesPlaying,
    };

    this.handleClick = this.handleClick.bind(this);
    this.skip = this.skip.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.takesPlaying != this.state.takesPlaying) {
      this.setState(prevState => ({takesPlaying: !prevState.takesPlaying}));
    }
    if (nextProps.stopPlaying === true) {
      this.handleClick();
    }
  }

  handleClick() {
    const {takesPlaying} = this.state;
    const {togglePlayingTakes} = this.props;
    if (!takesPlaying) {
      togglePlayingTakes();
      this.props.togglePlay(true);
    }
    else {
      togglePlayingTakes();
      this.props.togglePlay(false);
    }
  }

  skip(direction) {
    let index='';
    const {takesPlaying} = this.state;
    const {activeChunkIndex, selectedTakesLength} = this.props;
    if (direction === 'forward') {
      index = activeChunkIndex + 1;
      if (index < selectedTakesLength) {
        this.props.updateActiveChunkIndex(activeChunkIndex, index, takesPlaying);
        this.props.resetTake(true);
      } else {
        this.props.updateActiveChunkIndex(0, 0, takesPlaying);
        this.props.resetTake(true);
      }
    }
    else if (direction === 'previous') {

      index = activeChunkIndex - 1;
      if (index >= 0) {
        this.props.updateActiveChunkIndex(activeChunkIndex, index, takesPlaying);
        this.props.resetTake(true);
      }
    }
  }


  render() {
    const {takesPlaying} = this.state;
    let icon = <i className="material-icons">play_arrow</i>;
    if (takesPlaying) {
      icon = <i className="material-icons">pause</i>;
    }

    return (
      <Container>

        <SkipPrevious onClick={() => this.skip('previous')}> <i className="material-icons">skip_previous </i> </SkipPrevious>
        <PlayButton onClick={this.handleClick}> {icon}</PlayButton>
        <SkipNext onClick={() => this.skip('forward')}> <i className="material-icons">skip_next </i></SkipNext>


      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 30%;

  button {
    margin-right: 2vw;
  }
`;
Container.displayName = 'Container';


const PlayButton = styled.button`
  height: 6vh;
  width: 6vh;
  border-radius: 100px;
  padding: 0.5vh;
  background:linear-gradient(to top left, #0076FF, #00C5FF);
  color: white;
  border: none;
  box-shadow: 0px 3px 3px rgba(0,0,0,0.5);
  i {
    font-size: 36px;
    vertical-align: middle;
  }
`;
PlayButton.displayName = 'PlayButton';


const SkipPrevious = styled(PlayButton)`
  background: #39414A;
`;
SkipPrevious.displayName = 'SkipPrevious';



const SkipNext = styled(PlayButton)`
  background: #39414A;
`;
SkipNext.displayName = 'SkipNext';
