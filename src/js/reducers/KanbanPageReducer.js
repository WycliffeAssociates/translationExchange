const INITIAL_STATE = {
  takes: [],
  chunks: [],
  chunkNum: 1,
  activeChunkId: 1,
  publishedTakes: [],
  loading: false,
  playingTakeId: '',
  takesToDelete: [],
  removedTaketoDelete: false,
  project: null,
};

export default (state = INITIAL_STATE, action ={}) => {
  switch (action.type) {

    case 'LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_TAKE_SUCCESS':
    case 'NO_TAKES_FOR_CHUNK':
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

    case 'PATCH_CHAPTER_SUCCESS':
      return {
        ...state,
        chapter: action.chapter
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
        removedTaketoDelete: true, //used to update after a take is deleted
      };

    case 'UPDATE_TAKE':
      return {
        ...state,
        removedTaketoDelete: false,//used to update after a take is deleted
      };

    case 'SET_PROJECT':
      return {
        ...state,
        project: action.slug,
      };

    default: return state;
  }
};
