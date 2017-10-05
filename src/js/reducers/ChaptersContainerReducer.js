const INITIAL_STATE = {
    error: "",
    chapters: [],
    book: {},
    language: {},
    version: {},
    project_id: -1,
    is_published: false,
    loaded: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS": return {
            ...action.response,
            chapters: action.chapters,
            book: action.book,
            language: action.language,
            project_id: action.project_id,
            is_published: action.is_published,
            loaded: action.loaded
        };
        case 'SET_CHECKING_LEVEL_SUCCESS':
        
            return { ...state,  };
        case 'SET_CHECKING_LEVEL_FAILED':
            return { ...state, error: action.error }
        case "FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS": return { error: action.error };
        default: return state;
    }
};