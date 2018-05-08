import axios from 'axios';
import config from '../../config/config';

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
        //dispatch(dispatchAllProjectsFailed(err));
        redirect.push('/errorPage');

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
