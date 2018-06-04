const INITIAL_STATE = {
  loaded: false,
  error: '',
  projects: []
};

export default (state = INITIAL_STATE, action ={}) => {
  switch (action.type) {
    case 'SOURCE_AUDIO_SUCCESS':
      return {
        ...state,
        projects: action.projects,
        loaded: true,
      };
    case 'SOURCE_AUDIO_FAILED':
      return {
        ...state, error: action.err, loaded: true,
      };
    case 'SOURCE_AUDIO_LOADING':
      return {
        ...state, loaded: false, error: '',
      };
    default: return state;
  }
};
