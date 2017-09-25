import { RESET_AUDIOPLAYER } from '../actions/types';

const INITIAL_STATE = { language: {
  "hello", "juan"}

                      };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){



        case PLAY_AUDIO:
          return {
            state,
            play: true
          };

       default:
               return state;





    }



}
