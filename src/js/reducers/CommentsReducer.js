const INITIAL_STATE = {
  chapterComments: [],
  chunkComments: [],
  uploadingComments: false,
};

export default( state= INITIAL_STATE, action) => {

  switch (action.type) {
    case 'CHUNK_COMMENTS':
      return {
        ...state,
        chunkComments: action.comments,
      };

    case 'CHAPTER_COMMENTS':
      return {
        ...state,
        chapterComments: action.comments,
      };

    case 'SAVE_COMMENT_LOADING':
      return{...state, uploadingComments: action.uploadingComments};

    case 'UPDATE_CHUNK_COMMENTS':
      return {...state, chunkComments: [...state.chunkComments , action.comment]};

    case 'UPDATE_CHAPTER_COMMENTS':
      return {...state, chapterComments: [...state.chapterComments , action.comment]};

    default:
      return {
        ...state,
      };
  }

};
