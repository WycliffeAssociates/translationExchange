import axios from 'axios';
import config from '../../config/config';
import {getTakes} from '../actions';

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


export const saveComment = (blobx, type, id, chunkId, chunkNum, callback, errorCallback ) => { // chunkId & chunkNum, is used for refreshing the comments on takes
    return dispatch => {
        dispatch({type: 'SAVE_COMMENT_LOADING', uploadingComments: true}); // used to display loading UI
        return axios
            .post(config.apiUrl + 'comments/', {
                comment: blobx,
                user: 3,
                object: id,
                type: type
            },{
                headers: { Authorization: "Token " + localStorage.getItem('token') }
            })
            .then(response => {

                if(type === 'chunk'){
                    dispatch(updateChunkComments(response.data));
                }

                if(type === 'chapter'){
                    dispatch(updateChapterComments(response.data))
                }

                if(type === 'take'){
                    dispatch(getTakes(chunkId, chunkNum));
                }
                dispatch({type: 'SAVE_COMMENT_DONE', uploadingComments: false});
                callback();
            })
            .catch(error => {
              dispatch({type: 'UPLOAD_COMMENT_ERROR', error: error.toString()});
              });
    };
};


export const updateChunkComments = (comment) => {
    return {
        type: 'UPDATE_CHUNK_COMMENTS',
        comment
    }

};

export const updateChapterComments = (comment) => {
    return {
        type: 'UPDATE_CHAPTER_COMMENTS',
        comment
    }};


export const resetError = () => {
  return {
    type: 'RESET_ERROR',

  };
};
