import React from 'react';
import styled from 'styled-components';
import QueryString from 'query-string';
import Toggle from 'react-toggle';
import Comments from '../RecordCommentsComponents/Comments';
import ChunkPanel from './ChunkPanel';
import audioWaveImg from '../../../../../assets/images/Audio_Wave.svg'

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
    const { takes, chunkNum , location,
      chunks, chapterComments, chunkComments, activeChunkId, saveComment,
      uploadingComments, uploadError, resetError, txt, deleteComment, getTakes} = this.props;
    let publishedTakeLocation =null;
    let mode = txt.get("chunk");
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    takes.map(tk=>{ if (tk.published) { publishedTakeLocation = tk.location;} } );

    let toggled = localStorage.getItem("panelToggled") || "true";
    
    if (query.mode === 'Verse') {
      mode = txt.get("verse");
    }

    return (
      this.state.utilityPanel?
        <UtilityPanelContainer >
          <UtilityNavigation>
            <Toggle className="vertical_align_middle"
              onChange={ e => {
                this.setState({commentsTab: !e.target.checked});
                localStorage.setItem("panelToggled", e.target.checked ? "true" : "false");
              }}
              defaultChecked = {toggled == "true"} icons ={{
                unchecked: <i  className="material-icons">mode_comment</i>,
                checked: <img src={audioWaveImg}  />,
              }}  />

            <Hide onClick={this.toggleUtilityPanel}> <i style={{fontSize: '1.75vw'}} className="material-icons">arrow_forward</i> </Hide>

          </UtilityNavigation>
          { toggled != "true" ?
            <CommentsPanel>
              <Comments
                saveComment={saveComment}
                type="chapter"
                comments={chapterComments}
                text= {`${txt.get("chapter")} ${query.chapterNum}`}
                id={chapterId}
                uploadingComments={uploadingComments}
                uploadError = {uploadError}
                resetError ={resetError}
                txt={txt}
                deleteComment={deleteComment}
                location={location}
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
                location={location}
              />
            </CommentsPanel>
            :
            <ChunkPanel txt={txt} mode={mode} takeLocation={publishedTakeLocation}
              selectedChunk={chunkNum} chunks={chunks}
              getTakes={getTakes} {...this.props} />
          }
        </UtilityPanelContainer>
        :
        <UtilityPanelNotVisible>
          <Show onClick= {this.toggleUtilityPanel}> <i style={{fontSize: '2.0vw', paddingRight: '1vw'}} class="material-icons">arrow_back</i> </Show>
        </UtilityPanelNotVisible>

    );
  }

}
const CommentsPanel = styled.div`
`;
CommentsPanel.displayName= 'CommentsPanel';
const UtilityPanelNotVisible = styled.div`
margin-top: 1vw;
padding-top: 1vw;`;
UtilityPanelNotVisible.displayName= 'UtilityPanelNotVisible';

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
UtilityPanelContainer.displayName= 'UtilityPanelContainer';

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
UtilityNavigation.displayName= 'UtilityNavigation';

const Hide = styled.button`
  text-decoration: underline;
  color: white;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1.6vw;
`;
Hide.displayName= 'Hide';

const Show = styled(Hide)`
  color: white;
`;
Show.displayName= 'Show';
