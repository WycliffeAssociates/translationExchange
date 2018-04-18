import { UPDATE_LANGUAGE } from '../actions/types';
import language from '../../languages/textToDisplay.json'

const INITIAL_STATE = { displayText: language.English
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type){

    case UPDATE_LANGUAGE:
      return {
        state,
        displayText: language[action.updatelanguage]
      };

    default:
      return state;

  }



}
