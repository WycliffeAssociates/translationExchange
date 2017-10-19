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
                dispatch(setSourceProjectSuccess(response.data, query));
            })
            .catch(error => {
                dispatch(setSourceProjectFailed(error));
            });
    };
}

export function setSourceProjectSuccess(response, query) {
    return {
        type: 'SET_SOURCE_PROJECT_SUCCESS',
        response,
        query
    }
}
export function setSourceProjectFailed(error) {
    return {
        type: 'SET_SOURCE_PROJECT_FAILED',
        error
    }
};

//patch take
export const patchTake = (takeId, patch, success, chunks, updatingDeletedTake) => {
    return function (dispatch) {
        return axios
            .patch(config.apiUrl + "takes/" + takeId + "/", patch)
            .then(response => {
                //find correct take to update
                let chunksToSearchIn = chunks.slice();
                let chunkToUpdate = chunksToSearchIn.findIndex(chunk => {
                    return chunk.takes.find(take => take.take.id === takeId);
                });
                let takeToUpdate = chunksToSearchIn[chunkToUpdate].takes.findIndex(
                    take => take.take.id === takeId
                );
                chunksToSearchIn[chunkToUpdate].takes[takeToUpdate].take = response.data;
                if (success) {
                    setActiveToFalse(chunksToSearchIn[chunkToUpdate].takes[takeToUpdate].take);
                }
                dispatch(patchTakeSuccess(chunksToSearchIn));
            })
            .catch(error => {
                let message;
                if (error.response) {
                    if (error.response.status === 404) {
                        message = "Sorry, that take doesn't exist!";
                        updatingDeletedTake(takeId);
                    } else {
                        message = "Something went wrong. Please check your connection and try again.";
                    }
                } else {
                    message = "Something went wrong. Please check your connection and try again."
                }
                dispatch(patchTakeFailed(message));
            });
    };
}

export function patchTakeSuccess(updatedChunk) {
    return {
        type: 'PATCH_TAKE_SUCCESS',
        updatedChunk
    }
}
export function patchTakeFailed(error) {
    return {
        type: 'PATCH_TAKE_FAILED',
        error
    }
};
export const setActiveToFalse = () => {
    return {
        type: 'SET_ACTIVE_TO_FALSE'
    }
};
export const updateDeletedChunk = (updatedChunk) => {
    console.log("updated chunk", updatedChunk);
    return {
        type: 'UPDATE_DELETED_CHUNK',
        updatedChunk
    }
};

//delete take
export const deleteTake = (takeId, success, updatingDeletedTake) => {
    return function (dispatch) {
        return axios
            .delete(config.apiUrl + "takes/" + takeId + "/")
            .then((response) => {
                updatingDeletedTake(takeId);
                if (success) {
                    dispatch(setActiveToFalse());
                }
            }).catch(exception => {
                let message;
                if (exception.response) {
                    if (exception.response.status === 404) {
                        updatingDeletedTake(takeId);
                    } else {
                        message = "Something went wrong. Please check your connection and try again. ";
                    }
                } else {
                    message = "Something went wrong. Please check your connection and try again. ";
                }
                dispatch(deleteTakeFailed(message));
            });
    };
}

export function deleteTakeFailed(error) {
    return {
        type: 'DELETE_TAKE_FAILED',
        error
    }
};


export const chapterUpdate = (chapter) => {
    return {
         type: 'CHAPTER_UPDATE',
         chapter
        };
    };
