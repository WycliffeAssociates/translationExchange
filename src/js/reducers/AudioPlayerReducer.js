import { UPDATE_AUDIOPLAYER, PLAY_FROM_CARD_BUTTON} from '../actions/types';

const INITIAL_STATE = { play: false, playlist: false, playFromCardButton: false };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){

        case UPDATE_AUDIOPLAYER:
                return {...INITIAL_STATE, [action.payload.props] : action.payload.value } ;

       default:
               return state;


    }



}
