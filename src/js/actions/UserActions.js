import axios from 'axios';
import config from '../../config/config';

export const fetchUsers = (redirect) => {
return (dispatch) => {
    dispatch({type: 'FETCHING_USERS'});
    return axios
      .get(`${config.apiUrl}profiles/`)
      .then(response => {

        dispatch(fetchUserSuccess(response.data));
      })
      .catch(error => {
        console.log(error); //TODO handle error
        redirect.push('./ErrorPage');
      });
  };
};

export const fetchUserSuccess = (users) => {
  return {
    type: 'FETCHED_USERS',
    users,
  };
};


export const getUserHash = () => {

    return dispatch => {
        return axios
            .get(`${config.apiUrl}profiles/me`,
                {
                    headers: { Authorization: 'Token ' + localStorage.getItem('token') }
                })
            .then(response => {

              const{icon_hash} = response.data;
                dispatch(getUserHashSuccess(icon_hash));

            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const getUserHashSuccess = (iconHash) =>{
  return{
    type: 'GET_LOGGED_USER_HASH',
    iconHash



  };
};


//createUser
export const createUser = (recordedBlob, hash) => {
  return function(dispatch) {
    dispatch(loadingProccess()); // can be used to render a spinner
    return axios
      .post(`${config.apiUrl}profiles/`, {
        nameAudio: recordedBlob,
        iconHash: hash,
      })
      .then(response => {
        const {nameAudio, token} = response.data;

        localStorage.setItem('token', token);
        dispatch(userCreated(nameAudio, hash));
      })
      .catch( exception => {
        console.log(exception); //TODO display error page
      });
  };
};

export const userCreated = (audioName, hash)=>{
  return {
    type: 'USER_CREATED',
    audioName,
    hash,


  };
};

export const resetUserCreated = ()=>{
  return {
    type: 'RESET_USER_CREATED',
  };
};



export const onLoginSuccess = (user) => {
  return axios.post(`${config.apiUrl}login/social/token_user/github/`,{clientId:'f5e981378e91c2067d41',redirectUri: config.streamingUrl, code: user.code})
    .then(response=>{
      localStorage.setItem('token',response.data.token);

    }).catch(err=>{
      console.log(err);
    }
    );
};

export const loadingProccess = () => {
  return {
    type: 'LOADING_USER',
  };
};
export const identiconLogin = (iconHash, callback) => {

return dispatch => {
    return axios.post(`${config.apiUrl}login/`,{iconHash: iconHash})
      .then(response=>{
        localStorage.setItem('token',response.data.token);
        callback();
        dispatch(identiconLoginSuccess(iconHash));
      }).catch(err=>{
        console.log(err);
      }
      );
  };
};

export const identiconLoginSuccess = (iconHash) => {
  return {
    type: 'LOGIN_SUCCESS',
    iconHash: iconHash,
  };
};


export const removeUser = () => {
  return {
      type:'REMOVE_USER'
  }

};
