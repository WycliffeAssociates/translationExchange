import { UPDATE_LANGUAGE, IMPORT_LOCALIZATION } from '../reduxConstants';
import axios from 'axios';
import config from '../../config/config';

export const fetchLocalization = () => {
  return function(dispatch) {
    dispatch(dispatchLocalizationFetching());
    return axios
      .get(`${config.apiUrl}localization/`)
      .then(response => {
        dispatch(dispatchLocalizationReceived(response.data));
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
          dispatch(updateLanguage(storedLanguage))
        }
      })
      .catch(err => {
        dispatch(dispatchLocalizationFailed(err));
      });
  };
};

export const updateLanguage = (updatelanguage) => {
  return {
    type: UPDATE_LANGUAGE,
    updatelanguage,

  };
};

export const dispatchLocalizationReceived = (response) => {
  return {
    type: 'LOCALIZATION_SUCCESS',
    response,
  };
};
export const dispatchLocalizationFailed = err => {
  return {
    type: 'LOCALIZATION_FAILED',
    err: err.toString(),
  };
};
export const dispatchLocalizationFetching = () => {
  return {
    type: 'LOCALIZATION_FETCHING',
  };
};
