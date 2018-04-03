const INITIAL_STATE = {
  takes: [],
  chunks: [],
  chunkNum: 1,
  activeChunkId: 1,
  publishedTakes: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_TAKE_SUCCESS':
      return {
        ...state,
        takes: action.takes,
        chunkNum: action.chunkNum,
        activeChunkId: action.activeChunkId,

      };
    case 'FETCH_CHUNKS_SUCCESS':
      return {
        ...state,
        chunks: action.chunks,
      };

    case 'PATCH_TAKE_SUCCESS':
      return {
        ...state,
        takes: action.updatedTakes.slice(),
      };



    default: return state;
  }
};