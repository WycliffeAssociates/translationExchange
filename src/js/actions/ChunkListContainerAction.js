import axios from "axios";
import config from "../../config/config";
import { updateMode } from "./UpdatePlaylistActions";
import { notify } from 'react-notify-toast';


export const getAudioTakes = (chunkId, counter) => {
    const query = { chunk_id: chunkId }
    return function (dispatch) {
        return axios
            .get(`${config.apiUrl}takes/?chunk_id=${chunkId}`)
            .then(response => {
                if(counter === 0) {

                dispatch(dispatchTakesFirstTimeSuccess(response.data, chunkId));
              }else{
                dispatch(dispatchTakesSuccess(response.data, chunkId));
              }
            })
            .catch(error => {
                dispatch(dispatchChunksFailed(error));
            });
    };
}





export const getChunkIdClicked = (id) => {
  return {
      type: 'CHUNK_ID_CLICKED',
      id
  }


}


export const getSelectedProjectInfo = (query) => {                               // from the selected project get chunks, book, language, chapter, project
    return function (dispatch) {
        return axios
            .all([
                axios.get(`${config.apiUrl}chunks/?chapter_id=${query.chapter_num}`),
                axios.get(`${config.apiUrl}chapters/?project_id=${query.project_id}`),
                axios.get(`${config.apiUrl}projects/?project_id=${query.project_id}`),
                axios.get(`${config.apiUrl}books/?project_id=${query.project_id}`),
                axios.get(`${config.apiUrl}languages/?project_id=${query.project_id}`),
                axios.get(`${config.apiUrl}comments/?project_id=${query.project_id}`)

            ])
            .then(
            axios.spread(function (
                chunksResponse,
                chaptersResponse,
                projectsResponse,
                booksResponse,
                languageResponse,
                commentsResponse
            ) {

                dispatch(dispatchProjectInfoSuccess(
                    chunksResponse,
                    chaptersResponse,
                    projectsResponse,
                    booksResponse,
                    languageResponse,
                    commentsResponse
                                    ));

            })
            )
            .catch(error => {

                dispatch(dispatchChunksFailed(error)); //TODO change name to function
            });
    }
}

export const resetInfo = () => {
    return {
        type: 'RESET_STATE'
    }
}

export function dispatchProjectInfoSuccess(chunksResponse,
    chapterResponse,
    projectsResponse,
    booksResponse,
    languageResponse,
    commentsResponse
  ) {

    return {
        type: 'FETCH_PROJECT_SUCCESS',
        chunks: chunksResponse.data,
        project: projectsResponse.data[0],
        chapter: chapterResponse,
        book: booksResponse.data[0],
        language: languageResponse.data[0],
        comments: commentsResponse.data[0]
    }
}


export function dispatchTakesFirstTimeSuccess(takesResponse, chunkId) {
   takesResponse.map(take => take.chunkId = chunkId);

    return {
        type: 'FETCH_TAKE_SUCCESS_FIRST_TIME',
        takes: takesResponse
    }
}

export function dispatchTakesSuccess(takesResponse, chunkId) {
   takesResponse.map(take => take.chunkId = chunkId);

    return {
        type: 'FETCH_TAKE_SUCCESS',
        takes: takesResponse
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
            .get(config.apiUrl + "takes/", { ...query, chapter: chapter })
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
export const patchTake = (takeId, patch, success, takes, updatingDeletedTake, chunkId) => {
    return function (dispatch) {
        return axios
            .patch(config.apiUrl + "takes/" + takeId + "/", patch)
            .then(response => {
                //find correct take to update
                let listOfTakes = takes
                let takeIdToUpdate;
                takeIdToUpdate = listOfTakes.map(takes  => {
                  return takes.id

                  } ).indexOf(takeId);


                let updatedTakeInfo = response.data;
                updatedTakeInfo.chunkId = chunkId;
                listOfTakes[takeIdToUpdate] = updatedTakeInfo;
                dispatch(patchTakeSuccess(listOfTakes));
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

export function patchTakeSuccess(updatedTakes) {
    return {
        type: 'PATCH_TAKE_SUCCESS',
        updatedTakes
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

//delete comment
export const deleteComment = (type, commentId, takeId, updatingDeletedComment) => {
    return function (dispatch) {
        return axios
            .delete(config.apiUrl + "comments/" + commentId + "/")
            .then((response) => {
                updatingDeletedComment(type, commentId, takeId);
            }).catch(exception => {
                let message;
                if (exception.response) {
                    if (exception.response.status === 404) {
                        updatingDeletedComment(type, commentId, takeId);
                    } else {
                        message = "Something went wrong. Please check your connection and try again. ";
                    }
                } else {
                    message = "Something went wrong. Please check your connection and try again. ";
                }
                dispatch(deleteCommentFailed(message));
            });
    };
}

export function deleteCommentFailed(error) {
    return {
        type: 'DELETE_COMMENT_FAILED',
        error
    }
};

//	MarkedAsPublish
export const markedAsPublished = (success, chapter) => {
  debugger;
    return function (dispatch) {
        return axios
            .patch(config.apiUrl + "chapters/" + chapter.id + "/",
            { published: true })
            .then((response) => {
                let updatedChapter = Object.assign({}, chapter);
                updatedChapter.published = true;
                dispatch(markAsPublishedSuccess(updatedChapter));
                if (success) {
                    success();
                }
            }).catch(error => {
                dispatch(markAsPublishedFailed(error));
            });
    };
}

export function markAsPublishedSuccess(response) {
    return {
        type: 'MARK_AS_PUBLISHED_SUCCESS',
        response
    }
};
export function markAsPublishedFailed(error) {
    return {
        type: 'MARK_AS_PUBLISHED_FAILED',
        error
    }
};

//saveComment

export const saveComment = (blobx, type, id, success, chunks, chapter) => {
  debugger;
    return function (dispatch) {
        dispatch(saveCommentLoading());
        return axios
            .post(config.apiUrl + "comments/", {
                comment: blobx,
                user: 3,
                object: id,
                type: type
            })
            .then(results => {

                var map = { comment: results.data };
                debugger;
                let updatedChunks = chunks.slice();
                if (type === "take") {
                    let chunkToUpdate = updatedChunks.findIndex(chunk => {
                        return chunk.takes.find(take => take.take.id === id);
                    });
                    let takeToUpdate = updatedChunks[chunkToUpdate].takes.findIndex(
                        take => take.take.id === id
                    );
                    updatedChunks[chunkToUpdate].takes[takeToUpdate].comments.push(map);
                    dispatch(saveCommentSuccess(updatedChunks));
                } else if (type === "chunk") {
                    for (var i = 0; i < updatedChunks.length; i++) {
                        if (updatedChunks[i].id === id) {
                            var chunkToUpdate = i;
                        }
                    }
                    updatedChunks[chunkToUpdate].comments.push(map);
                    dispatch(saveCommentSuccess(updatedChunks));
                } else {
                    let updatedChapter = Object.assign({}, chapter);
                    updatedChapter.comments.push(map);
                    dispatch(chapterUpdate(updatedChapter));
                }
                success();
                let myColor = { background: '#50f442', text: "#FFFFFF" };
                notify.show("Saved", "custom", 1500, myColor);
            })
            .catch(exception => {
                dispatch(saveCommentFailed(exception))
                success();
            });
    }
}
export function saveCommentSuccess(response) {
    return {
        type: 'SAVE_COMMENT_SUCCESS',
        response
    }
};
export function saveCommentFailed(error) {
    return {
        type: 'SAVE_COMMENT_FAILED',
        error
    }
};
export function saveCommentLoading() {
    return {
        type: 'SAVE_COMMENT_LOADING'
    }
};
