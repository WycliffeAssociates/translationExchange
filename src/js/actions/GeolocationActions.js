import { UPDATE_LANGUAGE} from './types';


export const updateLanguage = (updatelanguage) => {

  return {
    type: UPDATE_LANGUAGE,
    updatelanguage

  }
};
