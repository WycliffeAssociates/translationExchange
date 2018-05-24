import update from 'immutability-helper';
import {PLAY_PAUSE_SELECTED_TAKE, UPDATE_ACTIVE_CHUNK_INDEX,
  LOADING, FETCH_ALTERNATE_TAKES, FETCH_CHUNKS} from './types';
const INITIAL_STATE = {
  selectedTakes: [],
  alternateTakes: [],
  loading: false,
  activeChunkIndex: 0,

};

export default (state = INITIAL_STATE, action) => {
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

    case PLAY_PAUSE_SELECTED_TAKE:
      return update(state, {
        selectedTakes: {
          [state.activeChunkIndex]: {
            playing: {$set: action.playing},
          },
        },
      });

    case UPDATE_ACTIVE_CHUNK_INDEX:
      return update(state, {
        selectedTakes: {
          [state.activeChunkIndex]: {
            playing: {$set: false},
          },
          [action.index]: {
            playing: {$set: true},
          },

        },
        activeChunkIndex: {$set: action.index},
      });


    default:
      return {
        ...state,
      };
  }
};
