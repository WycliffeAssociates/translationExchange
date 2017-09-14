import { PLAY_AUDIO, STOP_AUDIO, FINISHED_PLAYING, UPDATE_DATA } from '../actions/types';

const INITIAL_STATE = { play: false,
                        playFromCardButton: false,                            // not used yet
                        isFinished: false,
                        authorDate:''
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

      case UPDATE_DATA:    
        return {
          ...state,
          authorDate: action.authorDate
        };

       default:
               return state;





    }



}
