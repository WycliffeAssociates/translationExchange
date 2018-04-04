import React, {Component} from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import ReactPlayer from 'react-player';
import CommentsPlayer from './CommentsPlayer';
import config from '../../../../config/config';

class Player extends Component {

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
    const {owner_icon_hash} =this.props.comments || '' ;
    const id = owner_icon_hash.slice(0, 8);
    jdenticon.update(`#canvas${id}` , owner_icon_hash);

  }


  render() {
    const { comments} = this.props;
    const id = comments.owner_icon_hash.slice(0, 8);

    return (
      <Container>
        <IdenticonContainer>
          <Identicon onClick={()=>this.play()} id={`canvas${id}`} data-jdenticon-hash={comments.owner_icon_hash} />
          <ReactPlayer url={`${config.streamingUrl}${comments.owner_name_audio}`} playing={this.state.playing} onEnded={()=> this.ended()}  />

        </IdenticonContainer>
        <AudioContainer>
          <CommentsPlayer audioFile={`${config.streamingUrl}${comments.location}`} />
        </AudioContainer>
        <NewTextContainer>
          <NewText> New!</NewText>
        </NewTextContainer>

      </Container>
    )
  }
}

const Container = styled.div`
  padding-top: 1vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Identicon= styled.svg`
    height: 1.5vw;
    width: 1.5vw;
    cursor:pointer;
`;

const AudioContainer = styled.div`

`;

const NewText = styled.p`
  color: #FF9800;
`;

const NewTextContainer = styled.div`
  width: 2vw;

`;

const IdenticonContainer =styled.div`
  background-color: white;
  height: 1.5vw;
  width: 1.5vw;

`;

export default Player;
