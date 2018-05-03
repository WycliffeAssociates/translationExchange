const INITIAL_STATE = {
  takes: [],
  chunks: [],
  chunkNum: 1,
  activeChunkId: 1,
  publishedTakes: [],
  loading: false,
  playingTakeId: '',
  takesToDelete: [],
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
        activeChunkId: action.chunkId,
      };

    case 'PATCH_TAKE_SUCCESS':
      return {
        ...state,
        takes: action.updatedTakes.slice(),
        loading: false,
      };

    case 'UPDATE_PLAYING_TAKE':
      return {
        ...state,
        playingTakeId: action.takeId,
      };

    case 'ADD_TAKE_TO_DELETE':
      return {
        ...state,
        takesToDelete: [...state.takesToDelete, action.takeId],
      };

    case 'REMOVE_TAKE_TO_DELETE':
      return {
        ...state,
        takesToDelete: action.takesToDelete,
      };

    default: return state;
  }
};
