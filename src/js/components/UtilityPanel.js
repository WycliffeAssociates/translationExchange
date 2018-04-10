import React from 'react';
import styled from 'styled-components';
import QueryString from 'query-string';
import Toggle from 'react-toggle';
import Comments from '../pages/chunks/components/Comments';
import ChunkPanel from '../pages/KanbanBoard/components/ChunkPanel';

export default class UtilityPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      utilityPanel: true,
      chapterId: null,
      chunk_id: null,

    };

    this.toggleUtilityPanel = this.toggleUtilityPanel.bind(this);

  }


  componentDidMount() {
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    this.setState({chapterId: query.chapterId});
  }

  toggleUtilityPanel() {
    this.setState(prevState => ({utilityPanel: !prevState.utilityPanel}));
  }


  render() {
    const {chapterId} = this.state;
    const { takes, chunkNum , chapterNum, chunks, chapterComments, chunkComments, activeChunkId, saveComment, uploadingComments} = this.props;
    let publishedTakeLocation =null;
    takes.map(tk=>{ if (tk.published) { publishedTakeLocation = tk.location} } );

    return (
      this.state.utilityPanel?
        <UtilityPanelContainer >
          <UtilityNavigation>
            <Toggle
              onChange={e=>this.setState({commentsTab: e.target.checked})}
              defaultChecked= {false} icons ={{
                unchecked: <i style={{fontSize:'.5vw', paddingBottom: '1vw'}} className="material-icons">mode_comment</i>,
                checked: <img src={require('../../assets/images/Audio_Wave.svg')} />,
              }}  />

            <Hide onClick={this.toggleUtilityPanel}> <i style={{fontSize:'1.5vw'}} className="material-icons">arrow_forward</i> </Hide>

          </UtilityNavigation>
          { !this.state.commentsTab ?
            <CommentsPanel>
              <Comments
                saveComment={saveComment}
                type="chapter"
                comments={chapterComments}
                text= {`Chapter ${chapterNum}`}
                id={chapterId}
                uploadingComments={uploadingComments}
              />
              <Comments
                saveComment={saveComment}
                type="chunk"
                comments={chunkComments}
                text={`Chunk ${chunkNum}`}
                id={activeChunkId}
                uploadingComments={uploadingComments}
              />
              {takes.map(tk=>
                <Comments
                  uploadingComments={uploadingComments}
                  chunkId ={activeChunkId}
                  chunkNum ={chunkNum}
                  saveComment={saveComment}
                  type="take"
                  comments={tk.comments}
                  text={`Take ${tk.take_num}`}
                  id={tk.id} />) }
            </CommentsPanel>
            :
            <ChunkPanel takeLocation={publishedTakeLocation} selectedChunk={chunkNum} chunks={chunks} />
          }
        </UtilityPanelContainer>
        :
        <UtilityPanelNotVisible>
          <Show onClick= {this.toggleUtilityPanel}> <i style={{fontSize:'2.0vw', paddingRight:'1vw'}} class="material-icons">arrow_back</i> </Show>
        </UtilityPanelNotVisible>

    );
  }

}
const CommentsPanel = styled.div`

`;
const UtilityPanelNotVisible = styled.div`
margin-top: 1vw;
padding-top: 1vw;`;

const UtilityPanelContainer = styled.div`
  background: #2D2D2D;
   padding: 1vw;
   flex: 0.2;
   width: 15vw;
   height: 85vh;
   overflow-y: scroll;
   overflow-x: hidden;
  border-bottom: 1px solid #969595;
`;

const UtilityNavigation = styled.div`
  display: flex;
  flex-direction: row ;
  justify-content: space-between;
  margin-top: 1vw;
`;

const Hide = styled.button`
  text-decoration: underline;
  color: white;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1.6vw;
`;

const Show = styled(Hide)`
  color: white;

`;
