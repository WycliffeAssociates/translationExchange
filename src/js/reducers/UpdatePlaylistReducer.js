import { UPDATE_PLAYLIST , MULTIPLE_TAKES, UPDATE_MODE, PLAY_TAKE, CLEAR_PLAYLIST, REMOVE_TAKE_FROM_PLAYLIST, RESET_AUDIOPLAYER } from '../actions/types';

const INITIAL_STATE = { playlist: [],
                        mode: '',
                        playlistMode: false

                      };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){

        case PLAY_TAKE:
          return {
            ...state,
            playlist: [action.take]
          };

          case UPDATE_PLAYLIST:
            return {
              ...state,
              playlist: [...state.playlist, action.playlist]
            };

        case UPDATE_MODE:
            return {
              ...state,
              mode: action.mode
            };

        case MULTIPLE_TAKES:
             return {
               ...state,
              playlistMode: action.status
            };

        case CLEAR_PLAYLIST:
            return {
                ...state,
              playlist: []
              };

        case REMOVE_TAKE_FROM_PLAYLIST:
           state.playlist.splice(action.index, 1);
            return {
                ...state,
              playlist: [...state.playlist]
              };

         case RESET_AUDIOPLAYER:
            return INITIAL_STATE ;




       default:
               return state;


    }



}
