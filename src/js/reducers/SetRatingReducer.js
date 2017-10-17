import { SET_RATING } from '../actions/types';

const INITIAL_STATE = { direction: "ltr"
                      };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){

        case SET_RATING:
          return {
            state,
            direction: action.updateDirection
          };

       default:
               return state;

    }



}
