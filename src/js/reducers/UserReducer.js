const INITIAL_STATE = {
  users: [],
  loading: false,
  userCreated: false,
  audioName: '',
  hash: '',
  loggedInUser: null,
};

export default( state= INITIAL_STATE, action) => {

  switch (action.type) {

    case 'FETCHING_USERS':
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
    case 'LOADING_USER':
      return {
        ...state, loading: true,
      };
    case 'USER_CREATED':
      return {
        ...state,
        audioName: action.audioName,
        hash: action.hash,
        userCreated: true,
      };
    case 'RESET_USER_CREATED':
      return {...state, userCreated: false};

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loggedInUser: action.iconHash,
      };

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
