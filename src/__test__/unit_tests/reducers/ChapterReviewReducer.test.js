/* global expect describe it */
import reducer from '../../../js/reducers/ChapterReviewReducer';
import {FETCH_ALTERNATE_TAKES, GET_SELECTED_TAKES, CLEAR_ALTERNATE_TAKES,
  PLAY_PAUSE_SELECTED_TAKE, UPDATE_ACTIVE_CHUNK_INDEX, FINISH_PLAYING,
  SWAP_TAKE, UNDO_SWAP, UPDATE_ALTERNATE_TAKES, LOADING, CLEAR_SELECTED_TAKES} from '../../../js/reduxConstants';
describe('ChapterReviewReducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined,{})).toEqual({
      selectedTakes: [],
      alternateTakes: [],
      loading: false,
      activeChunkIndex: 0,
      tempTakes: [],
      stopPlaying: false,
    });
  });

  it('should handle LOADING', () => {
    expect(reducer({},{
      type: LOADING,
    })).toEqual({
      loading: true,
    });
  });

  it('should handle FETCH_ALTERNATE_TAKES', () => {
    expect(reducer({alternateTakes: []},{
      type: FETCH_ALTERNATE_TAKES,
      alternateTakes: {chunkId: 1, takes: [{}]},
    })).toEqual({
      alternateTakes: [{chunkId: 1, takes: [{}]}],
    });
  });

  it('should handle GET_SELECTED_TAKES', () => {
    expect(reducer({},{
      type: GET_SELECTED_TAKES,
      selectedTakes: [{chunkNum: 1, publishedTake: {}, playing: false}],
    })).toEqual({
      selectedTakes: [{chunkNum: 1, publishedTake: {}, playing: false}],
    });
  });

  it('should handle CLEAR_ALTERNATE_TAKES', () => {
    expect(reducer({},{
      type: CLEAR_ALTERNATE_TAKES,
    })).toEqual({
      alternateTakes: [],
    });
  });
  
  it('should handle CLEAR_SELECTED_TAKES', () => {
    expect(reducer({},{
      type: CLEAR_SELECTED_TAKES,
    })).toEqual({
      selectedTakes: [],
    });
  });

  it('should handle PLAY_PAUSE_SELECTED_TAKE', () => {
    expect(reducer({activeChunkIndex: 0,
      selectedTakes: [{ chunkNum: 1, publishedTake: {}, playing: false}]},{
      type: PLAY_PAUSE_SELECTED_TAKE,
      playing: true,
    })).toEqual({
      activeChunkIndex: 0,
      selectedTakes: [{chunkNum: 1, publishedTake: {}, playing: true}],
      stopPlaying: false,
    });

  });

  it('should handle UPDATE_ACTIVE_CHUNK_INDEX', () => {
    expect(reducer({activeChunkIndex: 0,
      selectedTakes: [{ chunkNum: 1, publishedTake: {}, playing: true},
        {chunkNum: 2, publishedTake: {}, playing: false}]},{
      type: UPDATE_ACTIVE_CHUNK_INDEX,
      takesPlaying: true,
      index: 1,
    })).toEqual({
      activeChunkIndex: 1,
      selectedTakes: [{chunkNum: 1, publishedTake: {}, playing: false},
        { chunkNum: 2, publishedTake: {}, playing: true}],
    });

  });

  it('should handle FINISH_PLAYING', () => {
    expect(reducer({activeChunkIndex: 0,
      selectedTakes: [{ chunkNum: 1, publishedTake: {}, playing: true}]},{
      type: FINISH_PLAYING,
      takesPlaying: false,
      index: 0,
    })).toEqual({
      activeChunkIndex: 0,
      selectedTakes: [{chunkNum: 1, publishedTake: {}, playing: false}],
      stopPlaying: true,
    });

  });


  it('should handle SWAP_TAKE', () => {
    expect(reducer({
      selectedTakes: [{ chunkNum: 1, publishedTake: {}, playing: false}],
      tempTakes: [],
    },{
      type: SWAP_TAKE,
      take: {id: 1, location: 'xxx'},
      index: 0,
    })).toEqual({
      selectedTakes: [{chunkNum: 1, publishedTake: {id: 1, location: 'xxx'}, playing: false}],
      tempTakes: [{ chunkNum: 1, publishedTake: {}, playing: false}],
    });
  });


  it('should handle UNDO_SWAP', () => {
    expect(reducer({
      selectedTakes: [],
      tempTakes: [{ chunkNum: 1, publishedTake: {id: 1, location: 'xxx'}, playing: false}],
    },{
      type: UNDO_SWAP,
      take: {id: 1, location: 'xxx'},
      index: 0,
    })).toEqual({
      selectedTakes: [{chunkNum: 1, publishedTake: {id: 1, location: 'xxx'}, playing: false}],
      tempTakes: [null],
    });
  });


  it('should handle UPDATE_ALTERNATE_TAKES', () => {
    expect(reducer({
      alternateTakes: [{takes: [{}]}, {takes: [{}] }],
      tempTakes: [{ chunkNum: 1, publishedTake: {id: 1, location: 'xxx'}, playing: false}],
    },{
      type: UPDATE_ALTERNATE_TAKES,
      chunkIndex: 0,
      takeIndex: 0,
      tempTakeIndex: 0,
      take: {id: 1, location: 'xxx'},
    })).toEqual({
      alternateTakes: [{takes: [{id: 1, location: 'xxx'}]}, {takes: [{}]}],
      tempTakes: [null],
    });
  });


});
