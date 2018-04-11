const INITIAL_STATE = {
  takes: [],
  chunks: [],
  chunkNum: 1,
  activeChunkId: 1,
  publishedTakes: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_TAKE_SUCCESS':
      return {
        ...state,
        takes: action.takes,
        chunkNum: action.chunkNum,
        activeChunkId: action.activeChunkId,
        loading: false,

      };
    case 'FETCH_CHUNKS_SUCCESS':
      return {
        ...state,
        chunks: action.chunks,
        loading: false,
      };

    case 'PATCH_TAKE_SUCCESS':
      return {
        ...state,
        takes: action.updatedTakes.slice(),
        loading: false,
      };



    default: return state;
  }
};
