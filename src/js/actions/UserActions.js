import axios from 'axios';
import config from '../../config/config';

export const fetchUsers = () => {
return (dispatch) => {
    return axios
      .get(`${config.apiUrl}profiles/`)
      .then(response => {
        dispatch(fetchUserSuccess(response.data));
      })
      .catch(error => {
        //TODO handle error
      })
  }
}

export const fetchUserSuccess = (users) => {
  return {
    type: 'FETCHED_USERS',
    users
  }
}


//saveComment
export const createUser = (recordedBlob, hash) => {
  return function(dispatch) {
    dispatch(loadingUsers());
    return axios
      .post(`${config.apiUrl}profiles/`, {
        nameAudio: recordedBlob,
        iconHash: hash
      })
      .then(response => {
        localStorage.setItem('token',response.data.token);
        //success();
        //TODO login user with user id and redirect him to projects
      })
      .catch(exception => {
        //dispatch(saveCommentFailed(exception));
        //success();
      });
  };
};

export const onLoginSuccess = (user) => {
  console.log(user);
  return axios.post(`${config.apiUrl}login/social/token_user/github/`,{clientId:'f5e981378e91c2067d41',redirectUri: config.streamingUrl, code:user.code})
    .then(response=>{
      console.log(response);
      localStorage.setItem('token',response.data.token);
    }).catch(err=>{
      console.log(err);
    }
    );
}

export const loadingUsers = () => {
  return {
    type: 'LOADING_USER'
  }
}
