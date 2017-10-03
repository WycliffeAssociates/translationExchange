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
        case 'CHAPTER_DATA_RECEIVED':
            return {...action.response, loaded:action.loaded };
        case 'CHAPTER_DATA_ERR':
            return state;
        default: return state;
    }
};