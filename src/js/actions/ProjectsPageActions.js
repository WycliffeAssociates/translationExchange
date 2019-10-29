import axios from 'axios';
import config from '../../config/config';
import {IMPORT_PROJECT} from '../reduxConstants';
export const fetchAllProjects = (query, redirect) => {
  return function(dispatch) {
    dispatch(dispatchAllProjectsLoading());
    return axios
      .get(`${config.apiUrl}projects/${query}`,{
        headers: { Authorization: 'Token ' + localStorage.getItem('token') },
      })
      .then(response => {
        dispatch(dispatchAllProjectsReceived(response.data, query ));
      })
      .catch(err => {
        dispatch(dispatchAllProjectsFailed(err));
        localStorage.removeItem('token');
        
        if(err.response != undefined && err.response.status == 401) {
          redirect.push('/welcome');
        } else {
          console.log("ERROR: ", config.apiUrl, query);
          redirect.push('/errorPage');
        }
      });
  };
};

export const importProject= (file) => {
  var data = new FormData();
  data.append('file', file);
  return function(dispatch) {
    return axios
      .post(`${config.apiUrl}upload/file`, data, {
        headers: { Authorization: 'Token '+localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
          'tr-file-name': file.name
        },
        timeout: 1200000,
      })
      .then(() => {
        dispatch({
          type: IMPORT_PROJECT,
        });
      });
  };
};

export const dispatchAllProjectsReceived = (response, queryString) => {
  return {
    type: 'ALL_PROJECTS_SUCCESS',
    response,
    queryString,
  };
};
export const dispatchAllProjectsFailed = err => {
  return {
    type: 'ALL_PROJECTS_FAILED',
    err: err.toString(),
  };
};
export const dispatchAllProjectsLoading = () => {
  return {
    type: 'ALL_PROJECTS_LOADING',
  };
};
export const dispatchAllProjectsReset = () => {
  return {
    type: 'ALL_PROJECTS_RESET',
  };
};
