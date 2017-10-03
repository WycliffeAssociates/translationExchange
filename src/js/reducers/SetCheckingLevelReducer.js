const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CHECKING_LEVEL_SUCCESS': return state;
        case 'SET_CHECKING_LEVEL_FAILED': return state;
        default: return state;
    }
};