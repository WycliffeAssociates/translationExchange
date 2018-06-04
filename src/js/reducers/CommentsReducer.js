const INITIAL_STATE = {
  chapterComments: [],
  chunkComments: [],
  uploadingComments: false,
  uploadError: false,
};

export default( state= INITIAL_STATE, action ={}) => {

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
      return {...state, uploadingComments: action.uploadingComments};

    case 'SAVE_COMMENT_DONE':
      return {...state, uploadingComments: action.uploadingComments};

    case 'UPDATE_CHUNK_COMMENTS':
      return {...state, chunkComments: [...state.chunkComments , action.comment]};

    case 'UPDATE_CHAPTER_COMMENTS':
      return {...state, chapterComments: [...state.chapterComments , action.comment]};

    case 'UPLOAD_COMMENT_ERROR':
      return {
        ...state,
        uploadingComments: false,
        uploadError: true,
      };

    case 'RESET_ERROR':
      return {
        ...state,
        uploadError: false,
      };

    default:
      return {
        ...state,
      };
  }

};
