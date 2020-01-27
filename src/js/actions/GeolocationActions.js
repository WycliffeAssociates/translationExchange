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

export const importLocalization = (file) => {
  var data = new FormData();
  data.append('file', file);
  return function(dispatch) {
    return axios
      .post(`${config.apiUrl}localization/upload/file`, data, {
        headers: { Authorization: 'Token '+localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000,
      })
      .then(() => {
        dispatch({
          type: IMPORT_LOCALIZATION,
        });
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
