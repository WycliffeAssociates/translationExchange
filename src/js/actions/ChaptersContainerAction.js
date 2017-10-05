import axios from "axios";
import config from "../../config/config";
import QueryString from "query-string";

export const fetchChaptersContainerData = (query) => {
    return function (dispatch) {
        return axios
            .post(config.apiUrl + "get_chapters/", query)
            .then(response => {
                dispatch(fetchChaptersContainerDataSuccess(response.data));
            })
            .catch(err => {
                dispatch(fetchChaptersContainerDataFailed(err));
            });
    };
}

export function fetchChaptersContainerDataSuccess(response) {
    return {
        type: 'FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS',
        response,
        chapters: response.chapters,
        book: response.book,
        project_id: response.project_id,
        is_publish: response.is_publish,
        language: response.language,
        loaded: true
    }
}
export function fetchChaptersContainerDataFailed(error) {
    return {
        type: 'FETCH_CHAPTERS_CONTAINER_DATA_FAILED',
        error
    }
};
export function setCheckingLevel(chapterId, level) {

    return function (dispatch) {
        return axios
            .patch(config.apiUrl + "chapters/" + chapterId + "/", { checked_level: level })
            .then(response => {
                dispatch(dispatchSetCheckingLevelSuccess(response.data));
            })
            .catch(err => {
                dispatch(dispatchSetCheckingLevelFailed(err));
            });
    };
}

export function dispatchSetCheckingLevelSuccess(response) {
    return {
        type: 'SET_CHECKING_LEVEL_SUCCESS',
        response
    }
}
export function dispatchSetCheckingLevelFailed(error) {
    return {
        type: 'SET_CHECKING_LEVEL_FAILED',
        error
    }
}