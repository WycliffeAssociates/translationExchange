import axios from 'axios';
import config from '../../config/config';

export const fetchUsers = (recordedBlob, generatedHash) => {
return (dispatch) => {
  return axios
    .get(`${config.apiUrl}/profiles/`
    .then(response => {
      const {users} = response.data;
      dispatch(fetchUserSuccess(users));
    })
    .catch(error => {
      //TODO handle error
    })
  }
}

export const fetchUserSuccess = (users) {
  return{
    type: 'FETCHED_USERS',
    users
  }
}


//saveComment
export const createUser = (recordedBlob, hash) => {
  return function(dispatch) {
    dispatch(loadingUsers());
    return axios
      .post(config.apiUrl + '/profiles/', { //TODO verify if profiles is the endpoint
        nameAudio: recordedBlob,
        iconHash: hash
      })
      .then(results => {

        //success();
      })
      .catch(exception => {
        //dispatch(saveCommentFailed(exception));
        //success();
      });
  };
};

export const loadingUsers = () => {
  return {
    type: 'LOADING_USER'
  }
}
