import { UPDATE_LANGUAGE} from '../reduxConstants';


export const updateLanguage = (updatelanguage) => {

  return {
    type: UPDATE_LANGUAGE,
    updatelanguage,

  };
};
