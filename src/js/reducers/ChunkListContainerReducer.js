const INITIAL_STATE = {
    loaded: false,
    error: "",
    chunks: [],
    comments: [],
    takes: [],
    project: {},
    book: {},
    chapter: {},
    language: {},
    active: false,
    selectedSourceProjectQuery: -1,
    selectedSourceProject: {},
    notifyFlag: false,
    update: false,
    chapterId:'',
    takesToExport: []
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
                loaded: true,
                chapterId:action.chapterId,
                calledChunks:''
            };
        case "FETCH_TAKE_SUCCESS":
            return {
                 ...state,
                takes: state.takes.concat(action.takes)
            };
        case "UPDATE_CHUNK_HAS_COMMENTS":
            return{
              ...state,
              chunks: action.updatedChunks
            }
        case "UPDATE_TAKE_HAS_COMMENTS":
            return{
              ...state,
              takes: action.updatedTakes
            }

            case "UPDATE_CHAPTER_HAS_COMMENTS":
                return{
                  ...state,
                  chapter: action.updatedChapter
                }

        case "DELETE_TAKE_SUCCESS":
            return {
                 ...state,
                 takes: action.takes
            };

        case 'DELETE_COMMENT_SUCCESS':
            return{
                ...state,
                comments: action.comments
            };

       case "GET_COMMENTS_SUCCESS":
            return{
              ...state,
             comments: action.comments

            };

        case "RESET_COMMENTS":
           return{
             ...state,
            comments: []
           }

        case "FETCH_TAKE_SUCCESS_FIRST_TIME":

            return {
                 ...state,
                takes: action.takes,

            };


        case "FETCH_TAKE_TO_EXPORT_SUCCESS":
            return {
                 ...state,
              takesToExport: action.takes,

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
                ...state, takes: action.updatedTakes.slice()
            }

        case 'CHUNK_ID_CLICKED':
        return{
          ...state,
          chunkIdClicked: action.id,
          calledChunks: [...state.calledChunks, action.id]
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
                ...state, comments: state.comments.concat(action.comments), active: false
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
