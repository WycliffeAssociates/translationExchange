const INITIAL_STATE = {
    error: "",
    chapters: [],
    book: {},
    language: {},
    version: {},
    project_id: -1,
    published: false,
    loaded: false,
    downloadError: "",
    downloadSuccess: "",
    downloadLoading: false,
    downloadLoadingSourceAudio: false,
    downloadErrorAudioSource: "",
    checked_level: -1
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS":
         return {
            ...state,
            chapters: action.chapters,
            book: action.book,
            language: action.language,
            version: action.version,
            project_id: action.project_id,
            published: action.published,
            loaded: action.loaded
        };
        case 'SET_CHECKING_LEVEL_SUCCESS':
            return { ...state, checked_level: action.checked_level };
        case 'SET_CHECKING_LEVEL_FAILED':
            return { ...state, error: action.error }
        // case 'FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS': return { error: action.error };
        case 'PUBLISH_FILES_SUCCESS':
            return { ...state, is_publish: true }
        case 'PUBLISH_FILES_FAILED':
            return { ...state, error: action.error }
        case 'DOWNLOAD_PROJECT':
            return {
                ...state,
                downloadLoading: true,
            }
        case 'DOWNLOAD_PROJECT_SUCCESS':
            return {
                ...state,
                downloadLoading: false,
                downloadSuccess: "Succes. Check your download folder."
            }
        case 'DOWNLOAD_PROJECT_FAILED':
            return {
                ...state,
                downloadLoading: false,
                downloadError: action.error
            }
        case 'DOWNLOAD_PROJECT_EXCEPTION':
            return {
                ...state, downloadError: action.downloadError
            };
        case 'DOWNLOAD_SOURCE_AUDIO': return {
            ...state,
            downloadLoadingSourceAudio: true,
        }
        case 'DOWNLOAD_SOURCE_AUDIO_SUCCESS':
            return {
                ...state,
                downloadLoadingSourceAudio: false
            }
        case 'DOWNLOAD_SOURCE_AUDIO_FAILED':
            return {
                ...state,
                downloadLoadingSourceAudio: false,
                downloadErrorAudioSource: action.error
            }
        default: return state;
    }
};
