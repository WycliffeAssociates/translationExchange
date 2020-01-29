import * as types from '../reduxConstants'
import language from '../../languages/textToDisplay.json';

const INITIAL_STATE = { 
  txt: {
    get: function(key) {
      return this.language.hasOwnProperty(key) ? this.language[key] : key
    },
    language: language.English
  },
  localization: language
};

export default (state = INITIAL_STATE, action = {}) => {

  switch (action.type) {
    case types.UPDATE_LANGUAGE:
      return {
        ...state,
        txt: {
          ...state.txt,
          language: state.localization.hasOwnProperty(action.updatelanguage) ? state.localization[action.updatelanguage] : language.English
        }
      };
    case types.LOCALIZATION_SUCCESS:
      return {
        ...state,
        localization: action.response,
        loading: false,
      };
    case types.LOCALIZATION_FAILED:
      return {
        ...state, error: action.err, loading: false,
      };
    case types.LOCALIZATION_FETCHING:
      return {
        ...state, loading: true,
      };
    default:
      return state;
  }

};
