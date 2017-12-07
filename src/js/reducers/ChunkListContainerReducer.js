const INITIAL_STATE = {
    loaded: false,
    error: "",
    chunks: [],
    comments: [],
    take: [],
    project: {},
    book: {},
    chapter: {},
    language: {},
    active: false,
    selectedSourceProjectQuery: -1,
    selectedSourceProject: {},
    notifyFlag: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_PROJECT_SUCCESS":

            return {
                ...state,
                chunks: action.chunks,
                project: action.project,
                chapter: action.chapter,
                book: action.book,
                language: action.language,
                comments: action.comments,
                takes: action.takes,
                loaded: true,
            };



            case "FETCH_TAKE_SUCCESS":

                return {
                    ...state,
                    take: action.take
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

        case 'UPDATE_DELETED_CHUNK':

         return {
            ...state, chunks: action.updatedChunk
        }

        case 'CHAPTER_UPDATE':
            return {
                ...state,
                chapter: action.chapter, active: false
            }

        case 'PATCH_TAKE_FAILED':
            return { ...state, error: action.error };

        case 'DELETE_TAKE_FAILED':
            return { ...state, error: action.error }

        case 'DELETE_COMMENT_FAILED':
            return { ...state, error: action.error }
        case 'MARK_AS_PUBLISHED_SUCCESS':
            return {
                ...state, chapter: action.response
            }
        case 'MARK_AS_PUBLISHED_FAILED':
            return {
                ...state, error: action.error
            }
        case 'SAVE_COMMENT_LOADING':
            return { ...state, active: true };
        case 'SAVE_COMMENT_SUCCESS':
            return {
                ...state, chunks: action.response, active: false
            }
        case 'SAVE_COMMENT_FAILED':
            return {
                ...state, error: action.error, active: false
            }
        case 'RESET_STATE':
            return INITIAL_STATE;

        default: return state;
    }
};
