import axios from "axios";
import config from "../../config/config";
import { updateMode } from "./UpdatePlaylistActions";
import { notify } from 'react-notify-toast';

// //dispatch Chunks
// export const fetchChunks = (query) => {
//   debugger;
//     return function (dispatch) {
//         return axios
//             .post(config.apiUrl + "get_chunks/", query)
//             .then(response => {
//                 dispatch(dispatchChunksSuccess(response.data));
//                 dispatch(updateMode(response.data.project.mode));
//             })
//             .catch(error => {
//                 dispatch(dispatchChunksFailed(error));
//             });
//     };
// }


export const getSelectedProjectInfo = (query) =>{                               // from the selected project get chunks, book, language, chapter, project
  return function(dispatch){
 debugger;
  return axios
            .all([
              axios.post(config.apiUrl + "get_chunks/", query),
              axios.post(config.apiUrl + "get_chapters/", query),
              axios.post(config.apiUrl + "get_projects/", query)
            ])
            .then(
              axios.spread(function(
                chunksResponse,
                chaptersResponse,
                projectsResponse
              ) {

                  dispatch(dispatchProjectInfoSuccess(
                    chunksResponse,
                    chaptersResponse,
                    projectsResponse
                  ));

              })
            )
            .catch(error => {

              dispatch(dispatchChunksFailed(error));
                  });

    }



}



export const resetInfo = () => {

    return {
        type: 'RESET_STATE'
    }

}

export function dispatchProjectInfoSuccess( chunksResponse,
                                            chapterResponse,
                                            projectsResponse

) {
  console.log(chapterResponse.data.chapters);
  
    return {
        type: 'FETCH_CHUNKS_SUCCESS',
        chunks: chunksResponse.data,
        project: projectsResponse.data,
        chapter: chapterResponse.data.chapters,
        book: chapterResponse.data.book,
        language: chapterResponse.data.language
    }
}
export function dispatchChunksFailed(error) {
  debugger;
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
    return function (dispatch) {
        return axios
            .patch(config.apiUrl + "chapters/" + chapter.id + "/",
            { is_publish: true })
            .then((response) => {
                let updatedChapter = Object.assign({}, chapter);
                updatedChapter.is_publish = true;
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
