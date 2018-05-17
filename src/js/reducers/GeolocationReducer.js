import { UPDATE_LANGUAGE } from '../actions/types';
import language from '../../languages/textToDisplay.json';

const INITIAL_STATE = { txt: language.English,
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case UPDATE_LANGUAGE:
      return {
        ...state,
        txt: action.updatelanguage,
      };

    default:
      return state;

  }



};
