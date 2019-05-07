import axios from 'axios';
import config from '../../config/config';

export const getDownloads = () => {
  return function(dispatch) {
    dispatch(dispatchDownloadsLoading());
    return axios
      .get(`${config.apiUrl}downloads/`)
      .then(response => {
        dispatch(dispatchDownloadsReceived(response.data));
      })
      .catch(err => {
        dispatch(dispatchDownloadsFailed(err));
      });
  };
};

export const dispatchDownloadsReceived = (response) => {
  return {
    type: 'DOWNLOADS_LIST_SUCCESS',
    response,
  };
};

export const dispatchDownloadsFailed = err => {
  return {
    type: 'DOWNLOADS_LIST_FAILED',
    err: err.toString(),
  };
};

export const dispatchDownloadsLoading = () => {
  return {
    type: 'DOWNLOADS_LIST_LOADING',
  };
};