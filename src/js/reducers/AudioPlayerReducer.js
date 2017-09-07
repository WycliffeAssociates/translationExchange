import { UPDATE_AUDIOPLAYER, AUDIOPLAYER_INITIAL_STATE} from '../actions/types';

const INITIAL_STATE = { play: false, loop: false };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){

        case UPDATE_AUDIOPLAYER:
                return {...INITIAL_STATE, [action.payload.props] : action.payload.value } ;

       default:
               return state;


    }



}
