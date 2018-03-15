const INITIAL_STATE = {
  users: [],
  loading: false,
  userCreated: false,
  audioName: '',
  hash: '',
};

export default( state= INITIAL_STATE, action) => {

  switch (action.type) {
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
        return {...state, userCreated: false,}

    default:
      return {
        ...state,
      };
  }

};
