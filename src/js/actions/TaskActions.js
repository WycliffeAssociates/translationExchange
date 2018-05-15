import axios from 'axios';
import config from '../../config/config';

export const getTasks = (type) => {
  return function(dispatch) {
    return axios
      .get(`${config.apiUrl}tasks/?type=${type || "upload"}`,
        {
          // headers: { Authorization: 'Token ' + localStorage.getItem('token') }
        })
      .then(response => {
        dispatch(getTasksSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getTasksSuccess = (tasks) => {
  return {
    type: 'FETCH_TASKS_SUCCESS',
    tasks,
  };
};
