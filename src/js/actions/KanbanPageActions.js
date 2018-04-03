import axios from 'axios';
import config from '../../config/config';
import {getComments} from './CommentsActions'

export const getTakes = (chunkId, chunkNum) => {  // chunkNum comes from the NavBar to display on the comments section the chunk number
  return function(dispatch) {
    return axios
      .get(`${config.apiUrl}takes/?chunk_id=${chunkId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') }
        })
      .then(response => {
        dispatch(getTakesSuccess(response.data, chunkNum));
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

export const getChunks = (chapterId) => {
  return dispatch => {
    return axios
      .get(`${config.apiUrl}chunks/?chapter_id=${chapterId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') }
        })
      .then(response => {
        dispatch(getChunksSuccess(response.data));
        const chunkId = response.data[0].id; //get the chunk id from the first chunk in the array of chunks
        dispatch(getTakes(chunkId, 1)); // get the takes from the first chunk and set chunkNum to 1
        dispatch(getComments(chunkId,'chunk_id')); // get comments for the first chunk

      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getChunksSuccess = (chunks) => {
  return {
    type: 'FETCH_CHUNKS_SUCCESS',
    chunks,
  };
};

//patch take
export const patchTake = (
    takeId,
    patch,
    success,
    takes
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
                    if(chk.id === chunkId && patch.published){    // select the chunk that we are updating and verify if it is
                        chk.published_take = take;                // marked as published, update the published take inside the chunk obj
                    }
                    if(chk.id === chunkId && !patch.published){    // unpublish take at chunk level
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
               // dispatch(patchTakeFailed(message));
            });
    };
};

export function patchTakeSuccess(updatedTakes) {
    return {
        type: 'PATCH_TAKE_SUCCESS',
        updatedTakes: updatedTakes,
    };
}



