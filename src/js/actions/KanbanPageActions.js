import axios from 'axios';
import config from '../../config';

export const getTakes = (chunkId) => {
  return function(dispatch) {
    return axios
      .get(`${config.apiUrl}takes/?chunk_id=${chunkId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') }
        })
      .then(response => {
        dispatch(getTakesSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};


export const getTakesSuccess = (takes) => {
  return {
    type: 'FETCH_TAKE_SUCCESS',
    takes
  };
}


export const getChunks = (chapterId) => {
  return dispatch => {
    return axios
      .get(`${config.apiUrl}chunks/?chapter_id=${chapterId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') }
        })
      .then(response => {
        dispatch(getChunksSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getChunksSuccess = (takes) => {
  return {
    type: 'FETCH_CHUNKS_SUCCESS',
    takes,
  };
}
