import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import PlayerTracker from '../../../../../components/PlayerTracker';
import jdenticon from 'jdenticon';
import config from '../../../../../../config/config';

export default class TakeCardCommentRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      id: null,
    };
    this.play = this.play.bind(this);
    this.ended = this.ended.bind(this);
  }

  componentDidMount() {
    const {comment} = this.props;
    jdenticon.update(`#CommentUser${comment.id}`, comment.owner_icon_hash);
  }

  play() {
    this.setState({playing: true});
  }

  ended() {
    this.setState({playing: false});
  }

  render() {

    const {comment} = this.props;

    return (
      <CommentRow>

        <IdenticonContainer>
          <Identicon onClick={()=>this.play()} id={`CommentUser${comment.id}`} data-jdenticon-hash={comment.owner_icon_hash} />
          <ReactPlayer url={`${config.streamingUrl}${comment.owner_name_audio}`} playing={this.state.playing} onEnded={()=> this.ended()}  />
        </IdenticonContainer>
        <CommentPlayer >
          <PlayerTracker url={comment.location} />
        </CommentPlayer>

        <RowButton> <i className="material-icons">delete</i> </RowButton>

      </CommentRow>
    );
  }

}


const CommentRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 0.01vw lightgray;
  overflow: hidden;
`;

const CommentPlayer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;


const Button = styled.button`
  font-size: 1.75vw;
  flex: 1;
  border: none;
  align-self: stretch;
  padding: 0.75vw;
  border-top: solid 0.05vw #009CFF;
  text-align:center;
  background: none;
`;

const RowButton = styled(Button)`
  flex:0;
  padding: 0.4vw;
  border-top: none;
  font-size: 1vw;
`;

const IdenticonContainer =styled.div`
  background-color: white;
  height: 1.5vw;
  width: 1.5vw;

`;


const Identicon= styled.svg`
    height: 1.5vw;
    width: 1.5vw;
    cursor:pointer;
`;
