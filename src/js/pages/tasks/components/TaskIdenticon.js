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

  render() {

    const { task } = this.props;

    return (
      <div style={{height: "3vw", width: "3vw"}}>
        <Identicon onClick={()=>this.play()} id="user" data-jdenticon-value={task.details.owner ? task.details.owner.icon_hash: 'foobar'} />
        <ReactPlayer 
          // url={'http://localhost/media/dump/name_audios/c0261faa.mp3'} 
          url={`${config.streamingUrl}${task.details.owner ? task.details.owner.name_audio : ''}`}
          playing={this.state.playing} 
          onEnded={()=> this.ended()}  />
      </div>
    );
  }

}

const Identicon = styled.svg`
  height: 3vw;
  width: 3w;
  margin: 0.5vw 0.5vw 0 0;
  cursor: pointer;
`;

export default TaskIdenticon;
