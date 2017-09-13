import { PLAY_AUDIO, STOP_AUDIO, FINISHED_PLAYING } from '../actions/types';

const INITIAL_STATE = { play: false,
                        playFromCardButton: false,                            // not used yet
                        isFinished: false
                      };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){



        case PLAY_AUDIO:
          return {
            ...state,
            play: true
          };

        case STOP_AUDIO:
          return {
            ...state,
            play: false
          };

       case FINISHED_PLAYING:
            return {
              ...state,
            isFinished: action.isFinished
            };

       default:
               return state;


    }



}
