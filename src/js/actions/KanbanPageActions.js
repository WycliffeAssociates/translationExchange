import axios from 'axios';
import config from '../../config/config';
import {getComments} from './CommentsActions'

export const getTakes = (chunkId, chunkNum) => {  // chunkNum comes from the NavBar to display on the comments section the chunk number
  return function(dispatch) {
    return axios
      .get(`${config.apiUrl}takes/?chunk_id=${chunkId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') }
        })
      .then(response => {
        dispatch(getTakesSuccess(response.data, chunkNum));
      })
      .catch(error => {
        console.log(error);
      });
  };
};


export const getTakesSuccess = (takes, chunkNum) => {
  return {
    type: 'FETCH_TAKE_SUCCESS',
    takes,
    chunkNum
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
        const chunkId = response.data[0].id; //get the chunk id from the first chunk in the array of chunks
        dispatch(getTakes(chunkId, 1)); // get the takes from the first chunk and set chunkNum to 1
        dispatch(getComments(chunkId,'chunk_id')); // get comments for the first chunk

      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getChunksSuccess = (chunks) => {
  return {
    type: 'FETCH_CHUNKS_SUCCESS',
    chunks,
  };
}
