import * as types from '../reduxConstants'
const INITIAL_STATE = {
  loading: false,
  error: '',
  downloads: [],
};

export default (state = INITIAL_STATE, action={}) => {
  switch (action.type) {
    case types.DOWNLOADS_LIST_SUCCESS:
      return {
        ...state,
        downloads: action.response,
        loading: false,
      };
    case types.DOWNLOADS_LIST_FAILED:
      return {
        ...state, error: action.err,loading: false,
      };
    case types.DOWNLOADS_LIST_LOADING:
      return {
        ...state, loading: true,
      };
    default: return state;
  }
};
