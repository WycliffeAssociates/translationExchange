const INITIAL_STATE = {
  chapterComments: [],
  chunkComments: [],
  loadingComments:false,

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

    case 'SAVING_COMMENT_LOADING':
      return{...state, loadingComments: true};

    case 'COMMENT_SAVED':
      return{...state, loadingComments: false};
    default:
      return {
        ...state,
      };
  }

};
