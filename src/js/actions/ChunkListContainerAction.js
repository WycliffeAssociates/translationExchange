import axios from 'axios';
import config from '../../config/config';
import { notify } from 'react-notify-toast';
import store from '../store';
import kanbanPage from "../reducers/KanbanPageReducer";

export const getAudioTakes = (chunkId, selectedChunk) => {
  return function(dispatch) {
    return axios
      .get(`${config.apiUrl}takes/?chunk_id=${chunkId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') },
        })
      .then(response => {
        // if (counter === 0) {
        //   dispatch(dispatchTakesFirstTimeSuccess(response.data, chunkId));
        // } else {
        dispatch(dispatchTakesSuccess(response.data, selectedChunk, chunkId));
        // }
      })
      .catch(error => {
        dispatch(dispatchChunksFailed(error));
      });
  };
};

export const getAudioComments = (query, type) => {

  return function(dispatch) {
    return axios
      .get(`${config.apiUrl}comments/?${type}=${query}`,
        {
          headers: { Authorization: "Token " + localStorage.getItem('token') }
        })
      .then(response => {
        switch (type) {
          case 'chunk_id':
            dispatch(dispatchGetAudioCommentsSuccess(response.data));
            break;
          case 'chapter_id':
            dispatch(dispatchGetAudioCommentsSuccess(response.data));
            break;

          default:


        }

      })
      .catch(error => {
        console.log(error); // todo manage error
      });
  };
};


export const getTakesToExport = (chapterId) => {
  return function(dispatch) {
    return axios
      .get(`${config.apiUrl}takes/?chapter_id=${chapterId}&published=true`,
      {
        headers: { Authorization: "Token " + localStorage.getItem('token') }
    })
      .then(response => {
        dispatch(dispatchTakesToExportSuccess(response.data));
      })
      .catch(error => {
        dispatch(dispatchChunksFailed(error));
      });
  };
};






export const dispatchGetAudioCommentsSuccess = comments => {
  return {
    type: 'GET_COMMENTS_SUCCESS',
    comments,
  };
};

export const getChunkIdClicked = id => {
  return {
    type: 'CHUNK_ID_CLICKED',
    id,
  };
};

export const getSelectedProjectInfo = query => {
  // from the selected project get chunks, book, language, chapter, project

  return function(dispatch) {
    return axios
      .all([
        axios.get(`${config.apiUrl}chunks/?chapter_id=${query.chapterId}`,{
          headers: { Authorization: "Token " + localStorage.getItem('token') }
      }),
        axios.get(
          `${config.apiUrl}chapters/?project_id=${query.project_id}&id=${
            query.chapterId
          }`
       ,{
        headers: { Authorization: "Token " + localStorage.getItem('token') }
    } ),
        axios.get(`${config.apiUrl}projects/?id=${query.project_id}`,{
          headers: { Authorization: "Token " + localStorage.getItem('token') }
      }),
        axios.get(`${config.apiUrl}books/?slug=${query.book}`,{
          headers: { Authorization: "Token " + localStorage.getItem('token') }
      }),
        axios.get(`${config.apiUrl}languages/?id=${query.project_id}`,{
          headers: { Authorization: "Token " + localStorage.getItem('token') }
      })
      ])
      .then(
        axios.spread(function(
          chunksResponse,
          chaptersResponse,
          projectsResponse,
          booksResponse,
          languageResponse
        ) {
          dispatch(
            dispatchProjectInfoSuccess(
              chunksResponse,
              chaptersResponse,
              projectsResponse,
              booksResponse,
              languageResponse,
              query.chapterId
            )
          );
        })
      )
      .catch(error => {
        dispatch(dispatchChunksFailed(error)); //TODO change name to function
      });
  };
};

export const resetInfo = () => {
  return {
    type: 'RESET_STATE',
  };
};

export function dispatchProjectInfoSuccess(
  chunksResponse,
  chapterResponse,
  projectsResponse,
  booksResponse,
  languageResponse,
  chapterId
) {
  return {
    type: 'FETCH_PROJECT_SUCCESS',
    chunks: chunksResponse.data,
    project: projectsResponse.data[0],
    chapter: chapterResponse.data[0],
    book: booksResponse.data[0],
    language: languageResponse.data[0],
    chapterId,
  };
}

export function dispatchTakesFirstTimeSuccess(takesResponse, chunkId) {
  takesResponse.map(take => (take.chunkId = chunkId));

  return {
    type: 'FETCH_TAKE_SUCCESS_FIRST_TIME',
    takes: takesResponse,
  };
}

export function dispatchTakesSuccess(takesResponse, selectedChunk, chunkId) {
  takesResponse.map(take => (take.chunkId = chunkId));

  return {
    type: 'FETCH_TAKE_SUCCESS',
    takes: takesResponse,
    selectedChunk
  };
}

export function dispatchTakesToExportSuccess(takesResponse) {

  return {
    type: 'FETCH_TAKE_TO_EXPORT_SUCCESS',
    takes: takesResponse,
  };
}

export function dispatchChunksFailed(error) {
  return {
    type: 'FETCH_CHUNKS_FAILED',
    error,
  };
}

//setSourceProject
export const setSourceProject = (query, chapter) => {
  return function(dispatch) {
    return axios
      .post(config.apiUrl + "takes/", { ...query, chapter: chapter },{
        headers: { Authorization: "Token " + localStorage.getItem('token') }
    })
      .then(response => {
        dispatch(setSourceProjectSuccess(response.data, query));
      })
      .catch(error => {
        dispatch(setSourceProjectFailed(error));
      });
  };
};

export function setSourceProjectSuccess(response, query) {
  return {
    type: 'SET_SOURCE_PROJECT_SUCCESS',
    response,
    query,
  };
}

export function setSourceProjectFailed(error) {
  return {
    type: 'SET_SOURCE_PROJECT_FAILED',
    error,
  };
}

// //patch take
// export const patchTake = (
//   takeId,
//   patch,
//   success,
//   takes,
//   updatingDeletedTake,
//   chunkId
// ) => {
//   return function(dispatch, getState) {
//
//       const {chunks, activeChunkId} = getState().kanbanPage;
//       debugger;
//
//     return axios
//       .patch(config.apiUrl + 'takes/' + takeId + '/', patch,{
//         headers: { Authorization: 'Token ' + localStorage.getItem('token') },
//       })
//       .then(response => {
//         debugger;
//         if(patch.published){
//
//
//
//         }
//
//
//         //find correct take to update
//         let listOfTakes = takes;
//         let takeIdToUpdate = takeId;
//         let takeToUpdateIndex;
//         let updatedTakeInfo = response.data;
//         updatedTakeInfo.chunkId = chunkId;
//
//         for (var i =0; i<listOfTakes.length; i++) {
//           if (listOfTakes[i].id === takeId) {
//             takeToUpdateIndex = i;
//             break;
//           }
//         }
//         listOfTakes[takeToUpdateIndex] = updatedTakeInfo;
//         dispatch(patchTakeSuccess(listOfTakes));
//
//
//       })
//       .catch(error => {
//         let message;
//         if (error.response) {
//           if (error.response.status === 404) {
//             message = 'Sorry, that take does not exist!';
//             updatingDeletedTake(chunkId);
//           } else {
//             message =
//               'Something went wrong. Please check your connection and try again.';
//           }
//         } else {
//           message =
//             'Something went wrong. Please check your connection and try again.';
//         }
//         dispatch(patchTakeFailed(message));
//       });
//   };
// };
//
// export function patchTakeSuccess(updatedTakes) {
//   return {
//     type: 'PATCH_TAKE_SUCCESS',
//     updatedTakes: updatedTakes,
//   };
// }
export function patchTakeFailed(error) {
  return {
    type: 'PATCH_TAKE_FAILED',
    error,
  };
}
export const setActiveToFalse = () => {
  return {
    type: 'SET_ACTIVE_TO_FALSE',
  };
};

//delete take
export const deleteTake = (takeId, success, updatingDeletedTake) => {
  return function(dispatch) {
    return axios
      .delete(config.apiUrl + "takes/" + takeId + "/",{
        headers: { Authorization: "Token " + localStorage.getItem('token') }
    })
      .then(response => {
        updatingDeletedTake(takeId);

        if (success) {
          dispatch(setActiveToFalse());
        }
      })
      .catch(exception => {
        let message;
        if (exception.response) {
          if (exception.response.status === 404) {
            updatingDeletedTake(takeId);
          } else {
            message =
              'Something went wrong. Please check your connection and try again. ';
          }
        } else {
          message =
            'Something went wrong. Please check your connection and try again.';
        }
        dispatch(deleteTakeFailed(message));
      });
  };
};

export function deleteTakeSuccess(takeId, takes) {
  const takeIndex = takes
    .map(tk => {
      return tk.id;
    })
    .indexOf(takeId);

  takes.splice(takeIndex, 1);

  return {
    type: 'DELETE_TAKE_SUCCESS',
    takes,
  };
}

export function deleteTakeFailed(error) {
  return {
    type: 'DELETE_TAKE_FAILED',
    error,
  };
}

export const chapterUpdate = chapter => {
  return {
    type: 'CHAPTER_UPDATE',
    chapter,
  };
};

//delete comment
export const deleteComment = (
  type,
  commentId,
  id,
  updatingDeletedComment,
  chunks,
  chapter,
  takes,
  comments
) => {
  return function(dispatch) {
    return axios
      .delete(config.apiUrl + "comments/" + commentId + "/",{
        headers: { Authorization: "Token " + localStorage.getItem('token') }
    })
      .then(() => {
        updatingDeletedComment(commentId, comments);
        if (comments.length === 0) {
          if (type === 'take') {
            let takeIdToUpdate;
            takeIdToUpdate = takes
              .map(tk => {
                return tk.id;
              })
              .indexOf(id);
            takes[takeIdToUpdate].has_comment = false;
            dispatch(updateTakesSuccess(takes));
          } else if (type === 'chunk') {
            let chunkIdToUpdate;
            chunkIdToUpdate = chunks
              .map(chunk => {
                return chunk.id;
              })
              .indexOf(id);
            chunks[chunkIdToUpdate].has_comment = false;
            dispatch(updateChunksSuccess(chunks));
          } else {
            chapter.has_comment = false;
            dispatch(updateChapterSuccess(chapter));
          }
        }
      })
      .catch(exception => {
        let message;
        if (exception.response) {
          if (exception.response.status === 404) {
            updatingDeletedComment(type, commentId, id);
          } else {
            message =
              'Something went wrong. Please check your connection and try again. ';
          }
        } else {
          message =
            'Something went wrong. Please check your connection and try again. ';
        }
        dispatch(deleteCommentFailed(message));
      });
  };
};

export function deleteCommentSuccess(commentId, comments) {
  const commentIndex = comments
    .map(comment => {
      return comment.id;
    })
    .indexOf(commentId);

  comments.splice(commentIndex, 1);

  return {
    type: 'DELETE_COMMENT_SUCCESS',
    comments,
  };
}

export function deleteCommentFailed(error) {
  return {
    type: 'DELETE_COMMENT_FAILED',
    error,
  };
}

//	MarkedAsPublish
export const markedAsPublished = (success, chapterId, set) => {
  return function(dispatch) {
    return axios
      .patch(config.apiUrl + "chapters/" + chapterId + "/", { published: set },{
        headers: { Authorization: "Token " + localStorage.getItem('token') }
    })
      .then(response => {
        const chapterNum = response.data.number;
        if (success) {
          success();
        }
        if (set) {
          let myColor = { background: '#50f442', text: '#FFFFFF' };
          notify.show(`Chapter ${chapterNum} Marked as Published`, 'custom', 2500, myColor);
          setTimeout(()=>window.history.go(-1), 500);
        }
        dispatch(markAsPublishedSuccess(response.data));
      })
      .catch(error => {
        dispatch(markAsPublishedFailed(error));
      });
  };
};


export function markAsPublishedSuccess(response) {
  return {
    type: 'MARK_AS_PUBLISHED_SUCCESS',
    response,
  };
}
export function markAsPublishedFailed(error) {
  return {
    type: 'MARK_AS_PUBLISHED_FAILED',
    error,
  };
}

// //saveComment
// export const saveComment = (
//   blobx,
//   type,
//   id,
//   success,
//   chunks,
//   chapter,
//   takes
// ) => {
//   return function(dispatch) {
//     dispatch(saveCommentLoading());
//     return axios
//       .post(config.apiUrl + 'comments/', {
//         comment: blobx,
//         user: 3,
//         object: id,
//         type: type
//       },{
//         headers: { Authorization: "Token " + localStorage.getItem('token') }
//       })
//       .then(results => {
//         if (type === 'take') {
//           dispatch(saveCommentSuccess(results.data));
//           let takeIdToUpdate;
//           takeIdToUpdate = takes
//             .map(tk => {
//               return tk.id;
//             })
//             .indexOf(id);
//           takes[takeIdToUpdate].has_comment = true;
//           dispatch(updateTakesSuccess(takes));
//         } else if (type === 'chunk') {
//           dispatch(saveCommentSuccess(results.data));
//           let chunkIdToUpdate;
//           chunkIdToUpdate = chunks
//             .map(chunk => {
//               return chunk.id;
//             })
//             .indexOf(id);
//           chunks[chunkIdToUpdate].has_comment = true;
//           dispatch(updateChunksSuccess(chunks));
//         } else {
//           dispatch(saveCommentSuccess(results.data));
//           chapter.has_comment = true;
//           dispatch(updateChapterSuccess(chapter));
//         }
//         success();
//       })
//       .catch(exception => {
//         dispatch(saveCommentFailed(exception));
//         success();
//       });
//   };
// };

export function updateTakesSuccess(updatedTakes) {
  return {
    type: 'UPDATE_TAKE_HAS_COMMENTS',
    updatedTakes,
  };
}

export function updateChapterSuccess(updatedChapter) {
  return {
    type: 'UPDATE_CHAPTER_HAS_COMMENTS',
    updatedChapter,
  };
}

export function updateChunksSuccess(updatedChunks) {
  return {
    type: 'UPDATE_CHUNK_HAS_COMMENTS',
    updatedChunks,
  };
}

export function resetComments() {
  return {
    type: 'RESET_COMMENTS',
  };
}

export function saveCommentSuccess(comments) {
  return {
    type: 'SAVE_COMMENT_SUCCESS',
    comments,
  };
}

export function saveCommentFailed(error) {
  return {
    type: 'SAVE_COMMENT_FAILED',
    error,
  };
}
export function saveCommentLoading() {
  return {
    type: 'SAVE_COMMENT_LOADING',
  };
}
