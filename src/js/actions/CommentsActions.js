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
          case 'take_id':

            dispatch(getTakesCommentsSuccess(response.data, takeNum));
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

export const getTakesCommentsSuccess= (comments, takeNum )=>{

  comments.map(cm => cm.takeNum = takeNum);
  return {
    type: 'TAKES_COMMENTS',
    comments,
  };
};
