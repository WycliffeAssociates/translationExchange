import * as types from '../reduxConstants'
const INITIAL_STATE = {
  loading: false,
  error: '',
  //projects holdder from the database
  projects: [],
  //query string used to get those projects from the database
  currentProjectQuery: '',
};

export default (state = INITIAL_STATE, action={}) => {
  switch (action.type) {
    case types.ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.response,
        loading: false,
        currentProjectQuery: action.queryString,
      };
    case types.ALL_PROJECTS_FAILED:
      return {
        ...state, error: action.err,loading: false,
      };
    case types.ALL_PROJECTS_LOADING:
      return {
        ...state, loading: true,
      };
    case types.ALL_PROJECTS_RESET:
      return {
        ...state, currentProjectQuery: '', projects: [],loading: false,
      };
    default: return state;
  }
};
