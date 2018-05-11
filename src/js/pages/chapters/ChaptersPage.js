import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from 'query-string';
import NavBar from '../../components/NavBar';
import Loading from '../../components/Loading';
import {getChunks, getUserHash,
  getChapters, removeUser, downloadProject, updateLanguage,
  saveComment, getComments} from '../../actions';
import ChapterCard from './components/ChapterCard';
import Toggle from './components/Toggle';
import styled from 'styled-components';
import 'css/takes.css';






export class ChapterPage extends Component {

  constructor() {
    super();
    this.state = {
      viewingComments: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount() {
    const {getChapters, chapters, history, updateLanguage} = this.props;

    if (chapters.length < 1) {
      const {search} = this.props.location;   //get data if the user refresh the page
      const query = QueryString.parse(search);
      getChapters(query.projectId, history);
    }
    const language = localStorage.getItem('language');
    if (language) {
      updateLanguage(language);
    }
  }

  componentDidMount() {
    const {history, getChapters} = this.props;
    if (this.props.updatePage === true && this.props.uploadingComment === false) {
      const {search} = this.props.location;   //get data if the user refresh the page
      const query = QueryString.parse(search);
      getChapters(query.projectId, history);
    }
  }

  handleToggle() {
    this.setState(prevState => ({viewingComments: !prevState.viewingComments}));
  }

  render() {
    const {chapters, txt, uploadingComments, saveComment} = this.props;
    const {search} = this.props.location;
    const query = QueryString.parse(search);

    return (
      <ChapterPageContainer>
        <NavBar chapterPage={true} kanban={false} {...this.props} />
        <DownloadBar onClick={()=> this.props.downloadProject(query.projectId)}>
          <DownloadButton> {txt.download}
            <i className="material-icons"> file_download </i></DownloadButton>
        </DownloadBar>

        {this.props.loading?
          <Loading txt={this.props.txt} height= "80vh" marginTop="5vw" />
          :

          <CardsContainer>
            <Toggle onClick={this.handleToggle} viewingComments={this.state.viewingComments} />
            {chapters.map((chp, index) =>
              <ChapterCard key={index} {...chp}
                {...this.props} viewingComments={this.state.viewingComments}
                chapterComments= {this.props.chapterComments}
                uploadingComments={uploadingComments}
                saveComment={saveComment} />)}

          </CardsContainer>

        }
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
    padding: 5vw 5vw;
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
  z-index: 99;

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
    removeUser, downloadProject, updateLanguage, saveComment, getComments}, dispatch);

};

const mapStateToProps = state => {

  const {chapters, loading, updatePage} =state.Chapters;

  const {loggedInUser} =state.user;

  const {uploadingComments} = state.comments;

  const {txt} = state.geolocation;

  return {chapters, loggedInUser, loading, txt, uploadingComments, updatePage};
};


export default connect(mapStateToProps,mapDispatchToProps)(ChapterPage);
