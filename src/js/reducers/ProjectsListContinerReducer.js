const INITIAL_STATE = {
    loaded: true,
    error: "",
    //projects holdder from the database
    projects: [],
    //query string used to get those projects from the database
    currentProjectQuery: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ALL_PROJECTS_SUCCESS":
            return {
                ...state,
                projects: action.response,
                loaded: true,
                currentProjectQuery: action.queryString
            };
        case "ALL_PROJECTS_FAILED":
            return {
                ...state, error: action.err
            }
        case "ALL_PROJECTS_LOADING":
            return {
                ...state, loaded: false
            }
        case "ALL_PROJECTS_RESET":
            return {
                ...state, currentProjectQuery: "", projects: [], loaded: true
            }
        default: return state;
    }
};