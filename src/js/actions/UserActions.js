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

export const getUserHashSuccess = (iconHash) => {
  return {
    type: 'GET_LOGGED_USER_HASH',
    iconHash
  };
};


//createUser
export const createUser = (recordedBlob, hash) => {
  return function(dispatch) {
    console.log(recordedBlob, 'NAMEAUDIO');
    dispatch(loadingProccess()); // can be used to render a spinner
    return axios
      .post(`${config.apiUrl}profiles/`, {
        name_audio: recordedBlob,
        icon_hash: hash,
      })
      .then(response => {
        const {nameAudio, token} = response.data;

        console.log(response.data, 'CREATE USER RESPONSE');
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

export const patchUser = (id, recordedBlob, hash) => {
  return function(dispatch) {
    console.log(id, recordedBlob, hash, 'PATCH USER');
    return axios
      .patch(`${config.apiUrl}profiles/${id}/`,{
        icon_hash: hash,
        name_audio: recordedBlob,

      }, {headers: { Authorization: 'Token ' + localStorage.getItem('token') },
      },
      ). then( response => {
        console.log(response.data);
        dispatch ({
          type: 'PATCHED_USER',
          audioName: response.name_audio,
          hash: response.icon_hash,
        });

      });
  };

};

export const createSocialUser = (user) => {
  return function(dispatch) {
    return axios.post(`${config.apiUrl}login/social/token_user/github/`,{clientId: 'f5e981378e91c2067d41',redirectUri: config.streamingUrl, code: user.code})
      .then(response=>{

        if (response.icon_hash == null || response.name_audio == null) {
          dispatch({
            type: 'SOCIAL_USER_CREATION',
            socialLogin: true,
            tempUserId: response.data.id,
          });
          localStorage.setItem('token',response.data.token);
        }

        else {
          dispatch ({
            type: 'LOGIN_SOCIAL_USER',
          });
          localStorage.setItem('token',response.data.token);
        }

      }).catch(err=>{
        console.log(err);
      }
      );
  };
};

export const onLoginSuccess = (user) => {
  return axios.post(`${config.apiUrl}login/social/token_user/github/`,{clientId: 'f5e981378e91c2067d41',redirectUri: config.streamingUrl, code: user.code})
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
    return axios.post(`${config.apiUrl}login/`,{icon_hash: iconHash})
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
