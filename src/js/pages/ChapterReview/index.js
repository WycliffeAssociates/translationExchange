import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAlternateTakes, getSelectedTakes,
  togglePlay, updateActiveChunkIndex, swapTake,
  undoSwapTake, setTake, saveComment, clearAlternateTakes} from '../../actions';
import styled from 'styled-components';
import ReviewColumn from './components/ReviewColumn';
import BottomBar from './components/BottomBar';
import QueryString from 'query-string';


class index extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      resetPos: false,
      alternateTakesFetched: false,
    };
    this.resetTake = this.resetTake.bind(this);
  }

  resetTake(bool) {
    this.setState({resetPos: bool});
  }

  componentWillMount() {
    var query = QueryString.parse(this.props.location.search);
    var chapterNum = query.chapterNum;
    this.props.getSelectedTakes(chapterNum, this.props.history);
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
      togglePlay, updateActiveChunkIndex, swapTake, clearAlternateTakes,
      undoSwapTake, tempTakes, txt, location} = this.props;
    const {resetPos} = this.state;
    const length = selectedTakes.length;
    return (
      <Container>
        <ReviewColumnsContainer>
          {
            selectedTakes?
              selectedTakes.map((take, index) => {
                return (
                  <ReviewColumn take={take} index={index} txt={txt}
                    alternateTakes={alternateTakes}
                    activeChunkIndex={activeChunkIndex}
                    updateActiveChunkIndex={updateActiveChunkIndex}
                    resetPos={resetPos} resetTake={this.resetTake}
                    tempTakes={tempTakes} swapTake={swapTake}
                    undoSwapTake = {undoSwapTake} setTake={setTake}
                    selectedTakesLength={length} saveComment={saveComment} location={location} />
                );
              }) : ''
          }
        </ReviewColumnsContainer>

        <BottomBar activeChunkIndex={activeChunkIndex}
          togglePlay={togglePlay} clearAlternateTakes={clearAlternateTakes}
          updateActiveChunkIndex={updateActiveChunkIndex}
          resetTake={this.resetTake} txt={txt}
          location={this.props.location} stopPlaying={stopPlaying}
          history={this.props.history} selectedTakesLength={length} />
      </Container>
    );
  }

}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getAlternateTakes,
    getSelectedTakes, togglePlay, updateActiveChunkIndex,
    swapTake, undoSwapTake, setTake, saveComment, clearAlternateTakes}, dispatch);
};

const mapStateToProps = state => {
  const {selectedTakes, alternateTakes,
    activeChunkIndex, tempTakes, stopPlaying} = state.ChapterReview;

  const {txt} = state.geolocation;

  return {
    selectedTakes, alternateTakes, activeChunkIndex,tempTakes,stopPlaying,txt,
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
  display: flex;
  align-items: center;


`;
const ReviewColumnsContainer=styled.div`
display: flex;
align-items: center;
overflow-x: auto;
`;

export default connect(mapStateToProps,mapDispatchToProps)(index);
