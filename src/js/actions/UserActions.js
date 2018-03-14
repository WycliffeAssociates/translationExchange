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
export const createUser = (recordedBlob, hash, callback) => {
  return function(dispatch) {
    dispatch(loadingProccess()); // can be used to render a spinner
    return axios
      .post(`${config.apiUrl}profiles/`, {
        nameAudio: recordedBlob,
        iconHash: hash
      })
      .then(response => {
        localStorage.setItem('token',response.data.token);
        callback(); // used to redirect user

      })
      .catch(exception => {

      });
  };
};

export const onLoginSuccess = (user) => {
  return axios.post(`${config.apiUrl}login/social/token_user/github/`,{clientId:'f5e981378e91c2067d41',redirectUri: config.streamingUrl, code:user.code})
    .then(response=>{
      localStorage.setItem('token',response.data.token);
    }).catch(err=>{
      console.log(err);
    }
    );
}

export const loadingProccess = () => {
  return {
    type: 'LOADING_USER'
  }
}
export const identiconLogin = (iconHash, callback) => {

return dispatch => {
    return axios.post(`${config.apiUrl}login/`,{iconHash: iconHash})
      .then(response=>{
        localStorage.setItem('token',response.data.token);
        callback();
        dispatch(identiconLoginSuccess());
      }).catch(err=>{
        console.log(err);
      }
      );
  }
}

export const identiconLoginSuccess = () => {
  return {
    type: 'IDENTICON_LOGIN_SUCCESS'
  }
}