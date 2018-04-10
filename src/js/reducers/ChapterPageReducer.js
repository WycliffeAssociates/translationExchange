const INITIAL_STATE = {
    chapters: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'GET_CHAPTERS_SUCCESS':
            return {
                ...state,
                chapters: action.chapters,
            };


        default: return state;
    }
};
