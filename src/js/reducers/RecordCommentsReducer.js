import { UPDATE_TITLE } from '../actions/types';


const INITIAL_STATE = { title: ''
                      };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){

        case UPDATE_TITLE:
          return {
            state,
            title: action.title
          };

       default:
               return state;

    }



}
