import React from 'react';
import styled from 'styled-components';

import QueryString from 'query-string';
import update from 'immutability-helper';
import jdenticon from 'jdenticon';
import ReactPlayer from 'react-player';
import config from '../../../../config/config';

class TaskIdenticon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      id:null,
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

  componentDidMount() {
    jdenticon.update(`#user${this.props.task.id.slice(0, 8)}`, this.props.task.details.user_icon_hash? 
      this.props.task.details.user_icon_hash: 'null user');
  }

  render() {

    const { task } = this.props;

    return (
      <Container>
        <Identicon onClick={()=>this.play()} id={`#user${task.id.slice(0, 8)}`} 
          data-jdenticon-hash={task.details.user_icon_hash ? task.details.user_icon_hash: 'null user'} />
        <ReactPlayer 
          url={`${config.streamingUrl}${task.details.user_name_audio ? task.details.user_name_audio : ''}`}
          playing={this.state.playing} 
          onEnded={()=> this.ended()}
          style={{display: "none"}} />
      </Container>
    );
  }

}

const Container = styled.div`
  flex: 0.5;
`;
Container.displayName = "Container";

const Identicon = styled.svg`
  height: 4vw;
  width: 4vw;
  cursor: pointer;
`;
Identicon.displayName = "Identicon";


export default TaskIdenticon;
