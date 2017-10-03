const INITIAL_STATE = {
    chapters: [],
    book: {},
    language: {},
    project_id: -1,
    is_publish: false,
    filesData: null,
    loaded: false,
    error: "",
    publishError: "",
    downloadError: "",
    downloadSuccess: "",
    anthology: {},
    downloadLoading: false,
    version: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PUBLISH_FILES_SUCCESS': return { ...action.response, is_publish: action.is_publish };
        case 'PUBLISH_FILES_FAILED':
        return{
            ...action.response
        };
        default: return state;
    }
};