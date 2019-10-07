import React from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import ReactPlayer from 'react-player';
import config from '../../../../config/config';

jdenticon.config = {
  replaceMode: "observe"
};

class TaskIdenticon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      id: null,
    };
    this.play = this.play.bind(this);
    this.ended = this.ended.bind(this);
  }

  play() {
    this.setState({playing: true});
  }

  ended() {
    this.setState({playing: false});
  }

  render() {

    const { task } = this.props;

    return (
      <Container>
        <IconBox>
          <Identicon onClick={()=>this.play()} id={`#user${task.id.slice(0, 8)}`}
            data-jdenticon-hash={task.details.user_icon_hash ? task.details.user_icon_hash: 'null user'} />
        </IconBox>
        <ReactPlayer
          url={`${config.streamingUrl}${task.details.user_name_audio ? task.details.user_name_audio : ''}`}
          playing={this.state.playing}
          onEnded={()=> this.ended()}
          style={{display: 'none'}} />
      </Container>
    );
  }

}

const Container = styled.div`
  flex: 0.5;
`;
Container.displayName = 'Container';

const IconBox = styled.div`
  width: 3.5vw;
  height: 3.5vw;
  background-color: white;
  border-top-right-radius: 1vw;
`;
IconBox.displayName = 'IconBox';

const Identicon = styled.svg`
  width: 3.5vw;
  height: 3.5vw;
  cursor: pointer;
`;
Identicon.displayName = 'Identicon';


export default TaskIdenticon;
