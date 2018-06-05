const INITIAL_STATE = {
  users: [],
  loading: false,
  userCreated: false,
  audioName: '',
  hash: '',
  loggedInUser: null,
  socialLogin: false,
  tempUserId: null,
};

export default( state= INITIAL_STATE, action ={}) => {

  switch (action.type) {

    case 'FETCHING_USERS':
    case 'LOADING_USER':
      return {
        ...state,
        loading: true,
      };


    case 'FETCHED_USERS':
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    case 'SOCIAL_USER_CREATION':
      return {
        ...state,
        socialLogin: action.socialLogin,
        tempUserId: action.tempUserId,
      };

    case 'USER_CREATED':
      return {
        ...state,
        audioName: action.nameAudio,
        hash: action.hash,
        userCreated: true,
        socialLogin: false,
      };

    case 'PATCHED_USER':
      return {
        ...state,
        audioName: action.name_audio,
        hash: action.hash,
        socialLogin: false,
        tempUserId: null,
      };
    case 'LOGIN_SOCIAL_USER':
      return {
        ...state,
        audioName: action.name_audio,
        hash: action.icon_hash,
      };

    case 'RESET_USER_CREATED':
      return {...state, userCreated: false};

    case 'LOGIN_SUCCESS':
    case 'GET_LOGGED_USER_HASH':
      return {
        ...state,
        loggedInUser: action.iconHash,
      };
    case 'REMOVE_USER':
      return INITIAL_STATE;

    default:
      return {
        ...state,
      };
  }

};
