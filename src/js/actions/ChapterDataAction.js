import axios from "axios";
import config from "../../config/config";

export function fetchChapterData(query) {
    return function (dispatch) {
        return axios
            .post(config.apiUrl + "get_chapters/", query)
            .then(response => {
                dispatch(chapterDataReceived(response.data));
            })
            .catch(err => {
                dispatch(fetchChapterDataErr(err));
            });
    };
}

export function chapterDataReceived(response) {
    return {
        type: 'CHAPTER_DATA_RECEIVED',
        response,
        loaded:true
    }
}
export function fetchChapterDataErr(error) {
    return {
        type: 'PUBLISH_FILES_FAILED',
        error
    }
}