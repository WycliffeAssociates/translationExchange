const INITIAL_STATE = {
  takes: [],
  chunks: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_TAKE_SUCCESS':
      return {
        ...state,
        takes: action.takes,

      };
    case 'FETCH_CHUNKS_SUCCESS':
      return {
        ...state,
        chunks: action.chunks,
      };

    default: return state;
  }
};
