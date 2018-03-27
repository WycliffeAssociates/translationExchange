const INITIAL_STATE = {
  chapterComments: [],
  chunkComments: []

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

    default:
      return {
        ...state,
      };
  }

};
