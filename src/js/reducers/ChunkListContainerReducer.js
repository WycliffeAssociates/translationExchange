const INITIAL_STATE = {
    loaded: false,
    error: "",
    chunks: [],
    project: {},
    book: {},
    chapter: {},
    language: {},
    active:false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_TAKES_SUCCESS":
            return {
                ...state,
                chapter: action.chapter,
                book: action.book,
                language: action.language,
                chunks: action.chunks,
                project: action.project,
                loaded: true,
            };
        case 'FETCH_TAKES_FAILED':
            return { ...state, error: action.error }
        default: return state;
    }
};