const INITIAL_STATE = {
  users: [],
  loading: false
}

export default( state= INITIAL_STATE, action) => {

  switch (action.type) {
    case 'FETCHED_USERS':
      return {
        ...state,
        users: action.users,
        loading: false

      };
    case 'LOADING_USER':
      return {
        ...state, loading: true
      }

    default:
      return {
        ...state,
      };
  }

}
