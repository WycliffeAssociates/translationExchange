import { DISPLAY_DIRECTION} from '../actions/types';


const INITIAL_STATE = { display: ''
                      };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){

        case DISPLAY_DIRECTION:
          return {
            state,
            display: action.display
          };


       default:
               return state;

    }



}
