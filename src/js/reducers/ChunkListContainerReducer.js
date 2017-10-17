const INITIAL_STATE = {
    loaded: false,
    error: "",
    chunks: [],
    project: {},
    book: {},
    chapter: {},
    language: {},
    active: false,
    selectedSourceProjectQuery: -1,
    selectedSourceProject: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_CHUNKS_SUCCESS":
            return {
                ...state,
                chunks: action.chunks,
                project: action.project,
                chapter: action.chapter,
                book: action.book,
                language: action.language,
                loaded: true,
            };
        case 'FETCH_CHUNKS_FAILED':
            return { ...state, error: action.error }
        case "SET_SOURCE_PROJECT_SUCCESS":
            return {
                ...state, selectedSourceProject: action.response,
                selectedSourceProjectQuery: action.query
            }
        case "SET_SOURCE_PROJECT_FAILED":
            return {
                ...state, error: action.error
            }
        case "SET_ACTIVE_TO_FALSE":
            return { ...state, active: false };
        case 'PATCH_TAKE_SUCCESS':
            return {
                ...state, chunks: action.updatedChunk
            }
        case 'UPDATE_DELETED_CHUNK': return {
            ...state, chunks: action.updatedChunk
        }
        case 'PATCH_TAKE_FAILED':
            return { ...state, error: action.error };
        case 'RESET_STATE':
            return INITIAL_STATE;
        default: return state;
    }
};
