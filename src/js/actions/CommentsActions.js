import axios from 'axios';
import config from '../../config/config';
import {getTakes, getTakesSuccess, getChapters} from '../actions';

export const getComments = (query, type) => {
  return function(dispatch) {
    return axios
      .get(`${config.apiUrl}comments/?${type}=${query}`,
        {
          headers: { Authorization: "Token " + localStorage.getItem('token') }
        })
      .then(response => {
        switch (type) {
          case 'chunk_id':
            dispatch(getChunkCommentsSuccess(response.data));
            break;
          case 'chapter_id':
            dispatch(getChapterCommentsSuccess(response.data));
            break;
          default:
        }

      })
      .catch(error => {
        console.log(error); // todo manage error
      });
  };
};


export const getChunkCommentsSuccess= (comments) => {
  return {
    type: 'CHUNK_COMMENTS',
    comments,
  };
};


export const getChapterCommentsSuccess= (comments)=>{
  return {
    type: 'CHAPTER_COMMENTS',
    comments,
  };
};


export const saveComment = (blobx, type, id, chunkId, chunkNum,projectId, callback, errorCallback, history ) => { // chunkId & chunkNum, is used for refreshing the comments on takes
  return dispatch => {
    dispatch({type: 'SAVE_COMMENT_LOADING', uploadingComments: true}); // used to display loading UI
    return axios
      .post(config.apiUrl + 'comments/', {
        comment: blobx,
        object: id,
        type: type,
      },{
        headers: { Authorization: 'Token ' + localStorage.getItem('token') },
      })
      .then(response => {

        if (type === 'chunk') {
          dispatch(updateChunkComments(response.data));
          dispatch({type: 'SAVE_COMMENT_DONE', uploadingComments: false});
          callback();

        }

        if (type === 'chapter') {
          if (projectId !== null) {
            dispatch({type: 'SAVE_COMMENT_DONE', uploadingComments: false});
            callback();
            dispatch(getChapters(projectId, history));
          }
          else {
            dispatch(updateChapterComments(response.data));
            dispatch({type: 'SAVE_COMMENT_DONE', uploadingComments: false});
            callback();
          }
        }

        if (type === 'take') {
          dispatch(getTakes(chunkId, chunkNum));
          dispatch({type: 'SAVE_COMMENT_DONE', uploadingComments: false});
          callback();
        }

      })
      .catch(error => {
        dispatch({type: 'UPLOAD_COMMENT_ERROR', error: error.toString()});
      });
  };
};


export const updateChunkComments = (comment) => {
  return {
    type: 'UPDATE_CHUNK_COMMENTS',
    comment,
  };

};

export const updateChapterComments = (comment) => {
  return {
    type: 'UPDATE_CHAPTER_COMMENTS',
    comment,
  };
};


export const resetError = () => {
  return {
    type: 'RESET_ERROR',

  };
};
//delete comment
export const deleteComment = (commentId, type, typeId) => {
  return (dispatch, getState) => {
    const {activeChunkId, chunkNum} = getState().kanbanPage? getState().kanbanPage: 1;

    return axios
      .delete(config.apiUrl + 'comments/' + commentId + '/', {
        headers: { Authorization: 'Token ' + localStorage.getItem('token') },
      })
      .then(() => {

        if (type === 'take') {
          dispatch(commentOnTakeDeletedSuccess(activeChunkId, chunkNum, dispatch ));
        }
        else {
          dispatch(commentDeletedSuccess(typeId, type, dispatch));
        }

      })
      .catch(error => {
        console.log(error);
      });

  };
};
export const commentOnTakeDeletedSuccess = ( activeChunkId, chunkNum, dispatch) => { // comments on takes deleted uses another function because comments are nested on the takes

  dispatch(getTakes(activeChunkId, chunkNum ));

  return {
    type: 'COMMENT_DELETED',
  };

};


export const commentDeletedSuccess = (id, type, dispatch) => {
  dispatch(getComments(id, `${type}_id` ));
  return {
    type: 'COMMENT_DELETED',
  };
};
