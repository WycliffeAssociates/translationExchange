import axios from 'axios';
import config from '../../config/config';
import {getComments} from './CommentsActions';

export const getTakes = (chunkId, chunkNum) => {  // chunkNum comes from the NavBar to display on the comments section the chunk number
  return function(dispatch) {
    dispatch({type: 'LOADING'});
    return axios
      .get(`${config.apiUrl}takes/?chunk_id=${chunkId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') },
        })
      .then(response => {
        if (response.data === undefined || response.data.length === 0) {
          dispatch(noTakesForChunk(chunkId,chunkNum));
        }
        else dispatch(getTakesSuccess(response.data, chunkNum));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getTakesSuccess = (takes, chunkNum) => {
  return {
    type: 'FETCH_TAKE_SUCCESS',
    takes,
    chunkNum,
    activeChunkId: takes[0].chunk,
  };
};

export const noTakesForChunk = (chunkId, chunkNum) => {
  return {
    type: 'NO_TAKES_FOR_CHUNK',
    takes: [],
    chunkNum,
    activeChunkId: chunkId,
  };
};

export function playTake(takeId) {
  return {
    type: 'UPDATE_PLAYING_TAKE',
    takeId,
  };
}


export const deleteTake = (takeId,chunkId,chunkNum) => {
  return function(dispatch) {
    return axios
      .delete(`${config.apiUrl}takes/${takeId}`,
        {
          headers: {Authorization: 'Token ' + localStorage.getItem('token')},
        })
      .then(response => {
        if (response) {
          dispatch(getTakes(chunkId, chunkNum)); }
      })
      .catch(error => {
        console.log(error);

      });
  };
};

export const deleteTakeSuccess = (res) => {
  return {
    type: 'DELETE_TAKE_SUCCESS',

  };
};

export const getChunks = (chapterId, startv, redirect) => {
  return dispatch => {
    dispatch({type: 'LOADING'});
    return axios
      .get(`${config.apiUrl}chunks/?chapter_id=${chapterId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') },
        })
      .then(response => {
        var chunkId = 0;

        for(var chunk in response.data) {
          if(response.data[chunk].startv == startv) {
            chunkId = response.data[chunk].id;
            break;
          }
        }
        
        dispatch(getChunksSuccess(response.data, chunkId));
        dispatch(getTakes(chunkId, startv));
        dispatch(getComments(chunkId, 'chunk_id'));        
      })
      .catch(error => {
        console.log(error);
        redirect.push('./ErrorPage');
      });
  };
};

export const getChunksSuccess = (chunks, chunkId) => {
  return {
    type: 'FETCH_CHUNKS_SUCCESS',
    chunks,
    chunkId,
  };
};

//patch take
export const patchTake = (
  takeId,
  patch,
  success,
  takes,
  chapterId,
  rating, //what is takes current rating
  isPublished //is take currently published
) => {

  return function(dispatch, getState) {

    const {chunks} = getState().kanbanPage;
    return axios
      .patch(config.apiUrl + 'takes/' + takeId + '/', patch,{
        headers: { Authorization: 'Token ' + localStorage.getItem('token') },
      })
      .then(response => {
        const chunkId = response.data.chunk;
        const take = response.data;

        chunks.map(chk => {

          if (chk.id === chunkId && patch.published) {    // select the chunk that we are updating and verify if it is
            chk.published_take = take;                // marked as published, update the published take inside the chunk obj

          }
          else if (chk.id === chunkId && !patch.published // unpublish take at chunk level
          && rating === 3 && isPublished ===true) {
            //
            chk.published_take = null;
          }
        });

        //find correct take to update
        let listOfTakes = takes;
        let takeToUpdateIndex;
        let updatedTakeInfo = response.data;


        for (var i =0; i<listOfTakes.length; i++) {
          if (listOfTakes[i].id === takeId) {
            takeToUpdateIndex = i;
            break;
          }
        }
        listOfTakes[takeToUpdateIndex] = updatedTakeInfo;
        success();
        dispatch(patchTakeSuccess(listOfTakes));
      })
      .catch(error => {
        let message;
        if (error.response) {
          if (error.response.status === 404) {
            message = 'Sorry, that take does not exist!';

          } else {
            message =
                    'Something went wrong. Please check your connection and try again.';
          }
        } else {
          message =
                'Something went wrong. Please check your connection and try again.';
        }
        return message;
      });
  };
};

export function patchTakeSuccess(updatedTakes) {
  return {
    type: 'PATCH_TAKE_SUCCESS',
    updatedTakes: updatedTakes,
  };
}

//patch chapter
export const patchChapter = (
  chapterId,
  patch,
) => {

  return function(dispatch) {

    return axios
      .patch(config.apiUrl + 'chapters/' + chapterId + '/', patch,{
        headers: { Authorization: 'Token ' + localStorage.getItem('token') },
      })
      .then(response => {
        dispatch(patchChapterSuccess(response.data));
      })
      .catch(error => {
        let message;
        if (error.response) {
          if (error.response.status === 404) {
            message = 'Sorry, that chapter does not exist!';

          } else {
            message =
                    'Something went wrong. Please check your connection and try again.';
          }
        } else {
          message =
                'Something went wrong. Please check your connection and try again.';
        }
        return message;
      });
  };
};

export const patchChapterSuccess = (chapter) =>{
  return {
    type: 'PATCH_CHAPTER_SUCCESS',
    chapter: chapter,
  };
};

export function addTakeToDelete(takeId) {
  return {
    type: 'ADD_TAKE_TO_DELETE',
    takeId,
  };
}

export function removeTakeToDelete(takeId, takesToDelete) {
  for (var i=0; i<takesToDelete.length; i++) {
    if (takesToDelete[i] === takeId) {
      takesToDelete.splice(i,1);
      break;
    }
  }

  return {
    type: 'REMOVE_TAKE_TO_DELETE',
    takesToDelete,
  };

}

export function updateTake() {
  return {
    type: 'UPDATE_TAKE',
  };
}

export function setProject(slug) {
  return {
    type: 'SET_PROJECT',
    slug: slug,
  };
}
