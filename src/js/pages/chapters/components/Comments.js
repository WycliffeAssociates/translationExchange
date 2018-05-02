import React, {Component} from 'react';
import styled from 'styled-components';
import PlayerTracker from '../../../components/PlayerTracker';
import ReactPlayer from 'react-player';
import config from 'config/config';
import jdenticon from 'jdenticon';

export default class Comments extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {comments} = this.props;
    jdenticon.update(`#CommentUser${comments[0].id}`, comments[0].owner_icon_hash);
  }


  render() {

    return (
      <div style={{overflow: 'auto'}}>
        {this.props.comments.map( (comment) => {
          return (
            <CommentContainer>

              <CommentPlayer >
                <PlayerTracker url={comment.location} />
              </CommentPlayer>

              <IdenticonContainer>
                <Identicon id={`CommentUser${comment.id}`} data-jdenticon-hash={comment.owner_icon_hash} />
                <ReactPlayer url={`${config.streamingUrl}${comment.owner_name_audio}`} playing={false} onEnded={()=> this.ended()}  />
              </IdenticonContainer>

            </CommentContainer>
          );

        })}

      </div>
    );
  }

}

const CommentContainer = styled.div`
margin: 2px;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
border-bottom: solid 0.01vw lightgray;
overflow: hidden;
background: white;
min-height: 40px;
`;

const CommentPlayer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const IdenticonContainer =styled.div`
  background-color: lightgray;
  height: 1.5vw;
  width: 1.5vw;
  margin-right: 5%;

`;

const Identicon= styled.svg`
    height: 1.5vw;
    width: 1.5vw;
    cursor:pointer;
`;
