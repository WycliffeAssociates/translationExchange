import {  CONNECTING, OPENED, MESSAGED, ERROR, CLOSED } from '../actions/types';

const initialState = {
    instance: null,
    loading: false,
    connected: false,
    error: null,
    message: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case CONNECTING:
        return {
            ...state,
            loading: true,
        };
    case OPENED:
        return {
            ...state,
            connected: true,
            loading: false,
            instance: action.instance,
        };
    case MESSAGED:
        return {
            ...state,
            message: action.message,
        };
    case ERROR:
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    case CLOSED:
        return {
            ...state,
            loading: false,
            connected: false,
            instance: null,
        };
    default:
        return state;
    }
};

export default reducer;
