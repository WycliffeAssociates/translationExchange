import axios from 'axios';
import config from '../../config/config';

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch({type: 'FETCHING_USERS'});
    return axios
      .get(`${config.apiUrl}profiles/`)
      .then(response => {
        dispatch(fetchUserSuccess(response.data));
      })
      .catch(error => {
        console.log(error); //TODO handle error
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

export const getUserHashSuccess = (icon_hash) =>{
  return {
    type: 'GET_LOGGED_USER_HASH',
    icon_hash,



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

export const userCreated = (audio_name, hash)=>{
  return {
    type: 'USER_CREATED',
    audio_name,
    hash,


  };
};

export const resetUserCreated = ()=>{
  return {
    type: 'RESET_USER_CREATED',
  };
};

export const patchUser = (id, recordedBlob, hash, callback) => {
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
          audio_name: response.data.name_audio,
          icon_hash: response.data.icon_hash,
        });
        callback();

      });
  };

};

export const createSocialUser = (user, callback) => {
  return function(dispatch) {
    return axios.post(`${config.apiUrl}login/social/token_user/github/`,{clientId: 'f5e981378e91c2067d41',redirectUri: config.streamingUrl, code: user.code})
      .then(response=>{

        if (response.data.icon_hash == '' || response.data.name_audio == '') {
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
            name_audio: response.data.name_audio,
            icon_hash: response.data.icon_hash,
          });
          localStorage.setItem('token',response.data.token);
          callback();
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
export const identiconLogin = (icon_hash, callback) => {

return dispatch => {
    return axios.post(`${config.apiUrl}login/`,{icon_hash: icon_hash})
      .then(response=>{
        localStorage.setItem('token',response.data.token);
        callback();
        dispatch(identiconLoginSuccess(icon_hash));
      }).catch(err=>{
        console.log(err);
      }
      );
  };
};

export const identiconLoginSuccess = (icon_hash) => {
  return {
    type: 'LOGIN_SUCCESS',
    icon_hash: icon_hash,
  };
};


export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
  };

};
