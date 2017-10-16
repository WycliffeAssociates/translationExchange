import axios from "axios";
import config from "../../config/config";
import { updateMode } from "./UpdatePlaylistActions";

//dispatch Chunks
export const fetchChunks = (query) => {
    return function (dispatch) {
        return axios
            .post(config.apiUrl + "get_project_takes/", query)
            .then(response => {
                dispatch(dispatchChunksSuccess(response.data));
                dispatch(updateMode(response.data.project.mode));
            })
            .catch(error => {
                dispatch(dispatchChunksFailed(error));
            });
    };
}


export const resetInfo = () => {

  return {
    type: 'RESET_STATE'
  }

}

export function dispatchChunksSuccess(response) {
    return {
        type: 'FETCH_CHUNKS_SUCCESS',
        chunks: response.chunks,
        project: response.project,
        chapter: response.chapter,
        book: response.book,
        language: response.language
    }
}
export function dispatchChunksFailed(error) {
    return {
        type: 'FETCH_CHUNKS_FAILED',
        error
    }
};

//setSourceProject

export const setSourceProject = (query, chapter) => {
    return function (dispatch) {
        return axios
            .post(config.apiUrl + "get_project_takes/", { ...query, chapter: chapter })
            .then(response => {
                dispatch(setSoruceProjectSuccess(response.data, query));
            })
            .catch(error => {
                dispatch(setSoruceProjectFailed(error));
            });
    };
}

export function setSoruceProjectSuccess(response, query) {
    return {
        type: 'SET_SOURCE_PROJECT_SUCCESS',
        response,
        query
    }
}
export function setSoruceProjectFailed(error) {
    console.log("error", error);
    return {
        type: 'SET_SOURCE_PROJECT_FAILED',
        error
    }
};
