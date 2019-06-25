import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAlternateTakes, getSelectedTakes,
  togglePlay, updateActiveChunkIndex, swapTake,
  undoSwapTake, setTake, saveComment, clearAlternateTakes, clearSelectedTakes} from '../../actions';
import styled from 'styled-components';
import ReviewColumn from './components/ReviewColumn';
import BottomBar from './components/BottomBar';
import QueryString from 'query-string';


export class ChapterReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resetPos: false,
      alternateTakesFetched: false,
      takesPlaying: false
    };
    this.resetTake = this.resetTake.bind(this);
    this.togglePlayingTakes = this.togglePlayingTakes.bind(this);
  }

  nextChapter(next_chapter_num) {
    const {chapters} = this.props;
    
    this.props.updateActiveChunkIndex(0, 0, false);
    this.props.clearAlternateTakes();
    this.props.clearSelectedTakes();

    var nextChapter = chapters.find(function(chapter){
      return chapter.number == next_chapter_num
        && chapter.published_chunks == chapter.total_chunks
    })

    if(nextChapter == undefined) { // if nextChapter is undefined, it means we have reached the last chapter in the book
      this.props.history.push({pathname: '/projects'});
    } 
    else {
      var query = QueryString.parse(this.props.location.search);
      query.chapterId = nextChapter.id;
      query.chapterNum = next_chapter_num;
    
      this.props.history.push({
        pathname: '/chapterReview',
        search: `?chapterId=${nextChapter.id}`+
                `&chapterNum=${next_chapter_num}`+
                `&startv=1`+
                `&bookName=${query.bookName}`+
                `&projectId=${query.projectId}`+
                `&mode=${query.mode}`,
      });

      this.props.getSelectedTakes(nextChapter.id, this.props.history);
      this.setState({alternateTakesFetched: false});
    }
  }

  resetTake(bool) {
    this.setState({resetPos: bool});
  }

  togglePlayingTakes() {
    this.setState(prevState => ({takesPlaying: !prevState.takesPlaying}));
  }

  componentWillMount() {
    var query = QueryString.parse(this.props.location.search);
    var chapterId = query.chapterId;
    this.props.getSelectedTakes(chapterId, this.props.history);
    this.setState({alternateTakesFetched: false});
  }

  componentDidUpdate() {
    const {selectedTakes, alternateTakes} = this.props;
    const {alternateTakesFetched} = this.state;
    if (alternateTakesFetched === false && alternateTakes.length === 0) { //only get alternate takes if the alternate takes haven't been loaded yet
      this.props.getAlternateTakes(selectedTakes);
      this.setState({alternateTakesFetched: true});
    }
  }


  render() {
    const {selectedTakes, alternateTakes, activeChunkIndex, setTake, stopPlaying,saveComment,
      togglePlay, updateActiveChunkIndex, swapTake, clearAlternateTakes, clearSelectedTakes,
      undoSwapTake, tempTakes, txt, location} = this.props;
    const {resetPos, takesPlaying} = this.state;
    const length = selectedTakes.length;
    var query = QueryString.parse(this.props.location.search);
    var chapterNum = query.chapterNum;
    return (
      <Container>
        <ReviewColumnsContainer>
          {
            selectedTakes?
              selectedTakes.map((take, index) => {
                return (
                  <ReviewColumn key={take.publishedTake.id} take={take} index={index} txt={txt}
                    alternateTakes={alternateTakes} togglePlayingTakes={this.togglePlayingTakes}
                    activeChunkIndex={activeChunkIndex}
                    updateActiveChunkIndex={updateActiveChunkIndex}
                    resetPos={resetPos} resetTake={this.resetTake}
                    tempTakes={tempTakes} swapTake={swapTake}
                    undoSwapTake = {undoSwapTake} setTake={setTake}
                    selectedTakesLength={length} saveComment={saveComment} location={location}
                    takesPlaying = {takesPlaying} />
                );
              }) : ''
          }
        </ReviewColumnsContainer>

        <BottomBar activeChunkIndex={activeChunkIndex}
          togglePlay={togglePlay} clearAlternateTakes={clearAlternateTakes}
          clearSelectedTakes={clearSelectedTakes}
          updateActiveChunkIndex={updateActiveChunkIndex}
          resetTake={this.resetTake} txt={txt}
          location={this.props.location} stopPlaying={stopPlaying}
          history={this.props.history} selectedTakesLength={length}
          togglePlayingTakes = {this.togglePlayingTakes}
          takesPlaying={takesPlaying} nextChapter={() => this.nextChapter(Number(chapterNum) +1)} />
      </Container>
    );
  }

}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getAlternateTakes, getSelectedTakes, togglePlay,
    updateActiveChunkIndex, swapTake, undoSwapTake, setTake, saveComment,
    clearAlternateTakes, clearSelectedTakes}, dispatch);
};

const mapStateToProps = state => {
  const {selectedTakes, alternateTakes,
    activeChunkIndex, tempTakes, stopPlaying} = state.ChapterReview;
  const {chapters} = state.Chapters;
  const {txt} = state.geolocation;

  return {
    selectedTakes, alternateTakes, activeChunkIndex,tempTakes,stopPlaying,txt,chapters
  };
  // all the state variables that you want to map to props
};

const Container= styled.div`
  background: #1D1D1E;
  height: 100vh;
  width: 100vw;
  position: absolute;
  overflow-y: hidden;
  overflow-x:hidden;
`;
Container.displayName = 'Container';
const ReviewColumnsContainer=styled.div`
display: flex;
align-items: center;
overflow-x: auto;
`;
ReviewColumnsContainer.displayName = 'ReviewColumnsContainer';

export default connect(mapStateToProps,mapDispatchToProps)(ChapterReview);
