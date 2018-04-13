import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from "query-string";
import NavBar from '../../components/NavBar';
import Loading from '../../components/Loading';
import {getChunks, getComments, getUserHash, getChapters, removeUser, downloadProject} from '../../actions';
import ChapterCard from './components/ChapterCard';
import styled from 'styled-components';
import 'css/takes.css';
import Data from '../projects/mockupdata/data';





class ChapterPage extends Component {

  componentWillMount() {
    const {getChapters, chapters, history} = this.props;

    if (chapters.length < 1) {
      const {search} = this.props.location;   //get data if the user refresh the page
      const query = QueryString.parse(search);
      getChapters(query.projectId, history);
    }

  }

  render() {
    const {chapters} = this.props;
    const {search} = this.props.location;
    const query = QueryString.parse(search);

    return (
      <ChapterPageContainer>
        <NavBar chapterPage={true} kanban={false} {...this.props} />
        <DownloadBar onClick={()=> this.props.downloadProject(query.projectId)}>
          <DownloadButton> Download
          <i className="material-icons"> file_download </i></DownloadButton>
        </DownloadBar>

        {this.props.loading?
          <Loading height="auto" />
          :

          <CardsContainer>
            {chapters.map(chp => <ChapterCard {...chp} {...this.props} />)}
              {/*{Data.map(chp => <ChapterCard  {...this.props} />)}*/}

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
    background-color: #F7F9FE
    overflow-y: scroll;
`;

const CardsContainer = styled.div`
    height:100%;
    width: 100vw;
    min-height: 850px;
    display: flex;
    flex-wrap: wrap;
    padding: 1vw;
    margin-top: 8vh;

`;

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



const mapDispatchToProps = dispatch => {

  return bindActionCreators({getChunks, getUserHash, getComments, getChapters, removeUser, downloadProject}, dispatch);

};

const mapStateToProps = state => {

  const {chapters, loading} =state.Chapters;

  const {loggedInUser} =state.user;

  const {takes} = state.kanbanPage;

  return {chapters, loggedInUser, loading};
};


export default connect(mapStateToProps,mapDispatchToProps)(ChapterPage);
