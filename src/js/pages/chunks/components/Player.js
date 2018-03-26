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
    };
    this.play = this.play.bind(this);
    this.ended = this.ended.bind(this);
  }

  play() {
    console.log(this.props.comments.owner_icon_hash)

    this.setState({playing: true});


  }

  ended() {
    this.setState({playing: false});
  }

  componentDidMount() {
    const {owner_icon_hash} =this.props.comments || '' ;
    jdenticon.update(`#canvas${owner_icon_hash}` , owner_icon_hash);

  }


  render() {
    const { id, owner_icon_hash, comments} = this.props;

    return (
      <Container>
        <IdenticonContainer>
          <Identicon onClick={()=>this.play()} id={`canvas${owner_icon_hash}`} data-jdenticon-hash={owner_icon_hash} />
          <ReactPlayer url={`${config.streamingUrl}${comments.owner_name_audio}`} playing={this.state.playing} onEnded={()=> this.ended()}  />

        </IdenticonContainer>
        <AudioContainer>
          {/* <Audio id="comment" controls controlsList="nodownload notime novolume ">
            <source style={{backgroundColor:'transparent'}} src="http://www.scricciolo.com/eurosongs/Calidris.ferruginea.wav" type="audio/wav" />
          </Audio> */}
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
