import axios from "axios";
import config from "../../config/config";

export function setCheckingLevel(chapterId, level) {
    return function (dispatch) {
        return axios
            .patch(config.apiUrl + "chapters/" + chapterId + "/", {checked_level: level})
            .then(response => {
                dispatch(setCheckingLevelSuccess(response.data));
            })
            .catch(err => {
                dispatch(setCheckingLevelFailed(err));
            });
    };
}

export function setCheckingLevelSuccess(response) {
    return {
        type: 'SET_CHECKING_LEVEL_SUCCESS',
    }
}
export function setCheckingLevelFailed(error) {
    return {
        type: 'SET_CHECKING_LEVEL_FAILED',
        error
    }
}