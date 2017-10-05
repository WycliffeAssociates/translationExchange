const INITIAL_STATE = {
    downloadLoading: false,
    downloadError: "",
    downloadSuccess: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DOWNLOAD_PROJECT_SUCCESS': return { ...state, ...action.downloadLoading, ...action.downloadSuccess };
        case 'DOWNLOADING_PROJECT_FAILED': return { ...state, ...action.downloadLoading, ...action.downloadError };
        case 'DOWNLOADING_PROJECT_EXCEPTION': return { ...state, ...action.downloadError };
        default: return state;
    }
};