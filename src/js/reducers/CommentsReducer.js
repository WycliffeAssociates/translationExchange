const INITIAL_STATE = {
  chapterComments: [],
  chunkComments: [],
  takesComments: []

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

    case 'TAKES_COMMENTS':
      return {
        ...state,
        takesComments: action.comments,
      };

    default:
      return {
        ...state,
      };
  }

};
