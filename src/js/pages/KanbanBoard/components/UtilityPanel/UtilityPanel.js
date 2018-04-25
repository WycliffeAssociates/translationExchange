import React from 'react';
import styled from 'styled-components';
import QueryString from 'query-string';
import Toggle from 'react-toggle';
import Comments from '../RecordCommentsComponents/Comments';
import ChunkPanel from './ChunkPanel';

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
    const { takes, chunkNum ,
      chunks, chapterComments, chunkComments, activeChunkId, saveComment,
      uploadingComments, uploadError, resetError, txt, deleteComment} = this.props;
    let publishedTakeLocation =null;
    let mode = txt.chunk;
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    takes.map(tk=>{ if (tk.published) { publishedTakeLocation = tk.location;} } );

    if (query.mode === 'verse') {
      mode = txt.verse;
    }

    return (
      this.state.utilityPanel?
        <UtilityPanelContainer >
          <UtilityNavigation>
            <Toggle className="vertical_align_middle"
              onChange={e=>this.setState({commentsTab: e.target.checked})}
              defaultChecked= {false} icons ={{
                unchecked: <i  className="material-icons">mode_comment</i>,
                checked: <img src={require('../../../../../assets/images/Audio_Wave.svg')} />,
              }}  />

            <Hide onClick={this.toggleUtilityPanel}> <i style={{fontSize: '1.75vw'}} className="material-icons">arrow_forward</i> </Hide>

          </UtilityNavigation>
          { !this.state.commentsTab ?
            <CommentsPanel>
              <Comments
                saveComment={saveComment}
                type="chapter"
                comments={chapterComments}
                text= {`${txt.chapter} ${query.chapterNum}`}
                id={chapterId}
                uploadingComments={uploadingComments}
                uploadError = {uploadError}
                resetError ={resetError}
                txt={txt}
                deleteComment={deleteComment}
              />
              <Comments
                saveComment={saveComment}
                type="chunk"
                comments={chunkComments}
                text={`${mode} ${chunkNum}`}
                id={activeChunkId}
                uploadingComments={uploadingComments}
                uploadError = {uploadError}
                resetError ={resetError}
                txt={txt}
                deleteComment={deleteComment}
              />
              {
              // takes.map(tk=>
              //   <Comments
              //     uploadingComments={uploadingComments}
              //     chunkId ={activeChunkId}
              //     chunkNum ={chunkNum}
              //     saveComment={saveComment}
              //     type="take"
              //     comments={tk.comments}
              //     text={`Take ${tk.take_num}`}
              //     id={tk.id}
              //     uploadError = {uploadError}
              //     resetError={resetError} />)
              }

            </CommentsPanel>
            :
            <ChunkPanel txt={txt} mode={mode} takeLocation={publishedTakeLocation} selectedChunk={chunkNum} chunks={chunks} />
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
  i {
    vertical-align: middle;
    font-size: 18px;
  }

  img {
    height: 14px;
    width: 14px;
  }
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
