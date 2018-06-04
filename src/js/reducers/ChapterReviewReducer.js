import update from 'immutability-helper';
import {PLAY_PAUSE_SELECTED_TAKE, UPDATE_ACTIVE_CHUNK_INDEX,
  LOADING, FETCH_ALTERNATE_TAKES,
  FETCH_CHUNKS, SWAP_TAKE, UPDATE_ALTERNATE_TAKES,
  UNDO_SWAP, FINISH_PLAYING, CLEAR_ALTERNATE_TAKES} from '../reduxConstants';
const INITIAL_STATE = {
  selectedTakes: [],
  alternateTakes: [],
  loading: false,
  activeChunkIndex: 0,
  tempTakes: [],
  stopPlaying: false,

};

export default (state = INITIAL_STATE, action ={}) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ALTERNATE_TAKES:
      return {
        ...state,
        alternateTakes: [...state.alternateTakes, action.alternateTakes],
      };
    case FETCH_CHUNKS:
      return {
        ...state,
        selectedTakes: action.selectedTakes,
      };

    case CLEAR_ALTERNATE_TAKES:
      return {
        ...state,
        alternateTakes: [],
      };

    case PLAY_PAUSE_SELECTED_TAKE:
      return update(state, {
        selectedTakes: {
          [state.activeChunkIndex]: {
            playing: {$set: action.playing},
          },
        },
        stopPlaying: {$set: false},
      });

    case UPDATE_ACTIVE_CHUNK_INDEX:
      return update(state, {
        selectedTakes: {
          [state.activeChunkIndex]: {
            playing: {$set: false},
          },
          [action.index]: {
            playing: {$set: action.takesPlaying},
          },

        },
        activeChunkIndex: {$set: action.index},
      });
    case FINISH_PLAYING:
      return update( state, {
        selectedTakes: {
          [action.index]: {
            playing: {$set: action.takesPlaying},
          },
        },
        stopPlaying: {$set: true},
      });

    case SWAP_TAKE:
      return update(state, {
        tempTakes: {
          [action.index]: {$set: state.selectedTakes[action.index]},
        },
        selectedTakes: {
          [action.index]: {
            publishedTake: {$set: action.take},
          },
        },
      });

    case UNDO_SWAP:
      return update(state, {
        selectedTakes: {
          [action.index]: {$set: state.tempTakes[action.index]},
        },
        tempTakes: {
          [action.index]: {$set: null},
        },
      });

    case UPDATE_ALTERNATE_TAKES: {
      return update(state, {
        alternateTakes: {
          [action.chunkIndex]: {
            takes: {
              [action.takeIndex]: {$set: action.take},
            },

          },
        },
        tempTakes: {
          [action.tempTakeIndex]: {$set: null},
        },
      });
    }


    default:
      return {
        ...state,
      };
  }
};
