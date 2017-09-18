import { UPDATE_PLAYLIST , MULTIPLE_TAKES, UPDATE_MODE, PLAY_TAKE } from '../actions/types';

const INITIAL_STATE = { playlist: [],
                        mode: '',
                        multipleTakes: false
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
              multipleTakes: action.status
            };


       default:
               return state;


    }



}
