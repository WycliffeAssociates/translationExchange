import axios from 'axios';
import config from '../../config/config';

export const getComments = (query, type, takeNum) => {

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


export const getChunkCommentsSuccess= (comments)=>{
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


export const saveComment = (blobx, type, id ) => {
    return dispatch => {
        //dispatch(saveCommentLoading());
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
                dispatch(saveCommentSuccess(response.data));
                debugger;
                dispatch(getComments(id, type));

                if(type === 'take_id'){

                }


            })
            .catch(exception => {
                //dispatch(saveCommentFailed(exception));

            });
    };
};

export const saveCommentSuccess = () =>{
  return{
    type:'SAVE_COMMENT_SUCCESS'
  }

};