import { UPDATE_LANGUAGE } from '../actions/types';
import language from '../../languages/languages.json'

const INITIAL_STATE = { language: language.English
                      };

export default (state = INITIAL_STATE, action) => {

    switch (action.type){

        case UPDATE_LANGUAGE:
          return {
            state,
            language: language.action.updateLanguage
          };

       default:
               return state;

    }



}
