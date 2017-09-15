import { UPDATE_PLAYLIST , MULTIPLE_TAKES, UPDATE_MODE } from '../actions/types';

const INITIAL_STATE = { playlist: [],
                        mode: '',
                        multipleTakes: false,
                        listenList:[]
                      };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){

        case UPDATE_PLAYLIST:
          return {
            ...state,
            playlist: action.playlist
          };

        case UPDATE_MODE:
            return {
              ...state,
              mode: action.mode
            };

        case UPDATE_MODE:
             return {
               ...state,
              mode: action.mode
            };


       default:
               return state;


    }



}
