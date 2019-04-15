import update from 'immutability-helper';
import {PLAY_PAUSE_SELECTED_TAKE, UPDATE_ACTIVE_CHUNK_INDEX,
  LOADING, FETCH_ALTERNATE_TAKES,
  GET_SELECTED_TAKES, SWAP_TAKE, UPDATE_ALTERNATE_TAKES,
  UNDO_SWAP, FINISH_PLAYING, CLEAR_ALTERNATE_TAKES, CLEAR_SELECTED_TAKES} from '../reduxConstants';
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
    case GET_SELECTED_TAKES:
      return {
        ...state,
        selectedTakes: action.selectedTakes,
      };

    case CLEAR_ALTERNATE_TAKES:
      return {
        ...state,
        alternateTakes: [],
      };

    case CLEAR_SELECTED_TAKES:
      return {
        ...state,
        selectedTakes: [],
      };

    case PLAY_PAUSE_SELECTED_TAKE:
      if(state.activeChunkIndex > state.selectedTakes.length-1) { 
        state.activeChunkIndex = 0; 
      }
      return update(state, {
        selectedTakes: {
          [state.activeChunkIndex]: {
            playing: {$set: action.playing},
          },
        },
        stopPlaying: {$set: false},
      });

    case UPDATE_ACTIVE_CHUNK_INDEX:
      if(state.activeChunkIndex > state.selectedTakes.length-1) { 
        state.activeChunkIndex = 0; 
        action.index = 0; 
      }
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
