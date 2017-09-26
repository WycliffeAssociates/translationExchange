import { UPDATE_LANGUAGE} from './types';
import nn from 'nearest-neighbor';
import languages from '../../languages/languages.json';


export const updateLanguage = (updatelanguage) => {
  debugger;
  return {
    type: UPDATE_LANGUAGE,
    updateLanguage

  }
};
