import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAlternateTakes, getSelectedTakes,
  togglePlay, updateActiveChunkIndex} from '../../actions';
import styled from 'styled-components';
import ReviewColumn from './components/ReviewColumn';
import BottomBar from './components/BottomBar';

class index extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      resetPos: false,
    };
    this.resetTake = this.resetTake.bind(this);
  }

  resetTake(bool) {
    this.setState({resetPos: bool});
  }

  componentWillMount() {
    this.props.getSelectedTakes(4, this.props.history);
  }

  componentDidUpdate() {
    const {selectedTakes, alternateTakes} = this.props;
    if (alternateTakes.length === 0 ) {
      this.props.getAlternateTakes(selectedTakes);
    }
  }


  render() {
    const {selectedTakes, alternateTakes, activeChunkIndex,
      togglePlay, updateActiveChunkIndex} = this.props;
    const {resetPos} = this.state;
    return (
      <Container>
        <ReviewColumnsContainer>
          {
            selectedTakes?
              selectedTakes.map((take, index) => {
                return (
                  <ReviewColumn take={take} index={index}
                    alternateTakes={alternateTakes}
                    activeChunkIndex={activeChunkIndex}
                    updateActiveChunkIndex={updateActiveChunkIndex}
                    resetPos={resetPos}
                    resetTake={this.resetTake} />
                );
              }) : ''
          }
        </ReviewColumnsContainer>

        <BottomBar activeChunkIndex={activeChunkIndex}
          togglePlay={togglePlay}
          updateActiveChunkIndex={updateActiveChunkIndex}
          resetTake={this.resetTake} />

      </Container>
    );
  }

}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getAlternateTakes,
    getSelectedTakes, togglePlay, updateActiveChunkIndex}, dispatch);
};

const mapStateToProps = state => {
  const {selectedTakes, alternateTakes, activeChunkIndex} = state.ChapterReview;

  return {
    selectedTakes, alternateTakes, activeChunkIndex,
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
