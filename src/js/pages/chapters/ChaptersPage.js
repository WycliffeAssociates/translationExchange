import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from 'query-string';
import NavBar from '../../components/NavBar';
import Loading from '../../components/Loading';
import {getChunks, getUserHash,
  getChapters, removeUser, downloadProject,
  saveComment, getComments, deleteComment} from '../../actions';
import ChapterCard from './components/ChapterCard';
import Toggle from './components/Toggler';
import styled from 'styled-components';
import '../../../css/takes.css';

export class ChapterPage extends Component {

  constructor() {
    super();
    this.state = {
      viewingComments: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount() {
    const {getChapters, history} = this.props;
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    getChapters(query.projectId, history);
  }

  handleToggle() {
    this.setState(prevState => ({viewingComments: !prevState.viewingComments}));
  }

  render() {
    const {chapters, txt, uploadingComments, saveComment, chapterComments} = this.props;

    return (
      <ChapterPageContainer>
        <NavBar chapterPage={true} kanban={false} {...this.props} />

        {this.props.loading?
          <Loading txt={txt} height= "80vh" marginTop="5vw" />
          :
          <CardsContainer>
            {chapters.map((chp, index) =>
              <ChapterCard key={index} {...chp}
                {...this.props} viewingComments={this.state.viewingComments}
                chapterComments= {chapterComments}
                uploadingComments={uploadingComments}
                saveComment={saveComment} />)}

          </CardsContainer>
        }
        <Toggle onClick={this.handleToggle} viewingComments={this.state.viewingComments} />

      </ChapterPageContainer>
    );
  }

}


const ChapterPageContainer = styled.div`
    display: flex;
    position:absolute;
    padding:0;
    margin:0;
    top:0;
    left:0;
    width: 100%;
    height: auto;
    min-height: 850px;
    flex-direction: column;
    background-color: #F3F3F3;
    overflow-y: scroll;
    overflow-x: hidden;
`;
ChapterPageContainer.displayName = 'ChapterPageContainer';

const CardsContainer = styled.div`
    height:auto;
    overflow-x: hidden;
    width: 100vw;
    min-height: 850px;
    display: flex;
    flex-wrap: wrap;
    padding: 10%;
    padding-top: 2.5%;
    background: #F4F7F9;
    align-self: center;
`;
CardsContainer.displayName = 'CardsContainer';


const DownloadBar = styled.div`
  width: 100vw;
  height: auto;
  background:#2D2D2D;
  position: absolute;
  top: 11vh;
  display: flex;
  padding: 0.5vh;
  flex-direction: column;
  z-index: 97;

`;
DownloadBar.displayName = 'DownloadBar';


const DownloadButton = styled.button`
  background: white;
  width: auto;
  padding: 0.4vh 1.5vw;
  border-radius: 0.1vw;
  height: 80%;
  color: #009CFF;
  align-self: flex-start;
  margin-top: 0.7vh;
  border: none;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  min-height: 40px;
  i {
    vertical-align: middle;
  }
`;
DownloadButton.displayName = 'DownloadButton';



const mapDispatchToProps = dispatch => {

  return bindActionCreators({getChunks, getUserHash, getChapters,
    removeUser, downloadProject, saveComment, getComments, deleteComment}, dispatch);

};

const mapStateToProps = state => {

  const {chapters, loading, updatePage} =state.Chapters;

  const {loggedInUser} =state.user;

  const {uploadingComments} = state.comments;

  const {txt} = state.geolocation;

  return {chapters, loggedInUser, loading, txt, uploadingComments, updatePage};
};


export default connect(mapStateToProps,mapDispatchToProps)(ChapterPage);
