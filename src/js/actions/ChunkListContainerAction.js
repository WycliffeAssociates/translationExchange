import axios from "axios";
import config from "../../config/config";
import { updateMode } from "./UpdatePlaylistActions";

export const fetchTakes = (query) => {
    return function (dispatch) {
        return axios
            .post(config.apiUrl + "get_project_takes/", query)
            .then(response => {
                console.log('finding chunk',response);
                dispatch(fetchTakesSuccess(response.data));
                dispatch(updateMode(response.data.project.mode));
            })
            .catch(error => {
                dispatch(fetchTakesFailed(error));
            });
    };
}

export function fetchTakesSuccess(response) {
    return {
        type: 'FETCH_TAKES_SUCCESS',
        chunks: response.chunks,
        project: response.project,
        chapter: response.chapter,
        book: response.book,
        language: response.language
    }
}
export function fetchTakesFailed(error) {
    return {
        type: 'FETCH_TAKES_FAILED',
        error
    }
};