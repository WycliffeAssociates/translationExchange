import React, {Component} from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import CommentsPlayer from './CommentsPlayer';

class Player extends Component {

  componentDidMount() {
    const {icon_hash} =this.props.user || '' ;
    jdenticon.update(`#canvas${this.props.id}` , icon_hash);

    debugger;
  }


  render() {
    const { key, icon_hash, audioUrl} = this.props;
    return (
      <Container>
        <IdenticonContainer>
          {/* <Identicon id={`canvas${key}`} data-jdenticon-hash={icon_hash} /> */}
          <Identicon id="ActiveUser"
            data-jdenticon-value="Antonio" />
        </IdenticonContainer>
        <AudioContainer>
          {/* <Audio id="comment" controls controlsList="nodownload notime novolume ">
            <source style={{backgroundColor:'transparent'}} src="http://www.scricciolo.com/eurosongs/Calidris.ferruginea.wav" type="audio/wav" />
          </Audio> */}
          <CommentsPlayer audioFile="https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3" />
        </AudioContainer>
        <NewTextContainer>
          {/* <NewText> New!</NewText> */}
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
