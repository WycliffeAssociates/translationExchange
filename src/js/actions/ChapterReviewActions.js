import axios from 'axios';
import config from '../../config/config';
import {getComments} from './CommentsActions';

export const getAlternateTakes = (selectedTakes) => {  // chunkNum comes from the NavBar to display on the comments section the chunk number
  return function(dispatch) {

    selectedTakes.forEach((take) => {
      return axios
        .get(`${config.apiUrl}takes/?chunk_id=${take.publishedTake.chunk}`,
          {
            headers: { Authorization: 'Token ' + localStorage.getItem('token') },
          })
        .then(response => {
          let takes = response.data;
          processTakes(takes).then( (tempArray) => {
            dispatch(getAlternateTakesSuccess(tempArray));
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };
};

async function processTakes(takes) {
  let tempArray =[];
  let chunkId ='';
  for (const take of takes) {
    if (take.rating ===3 && take.published === false) {
      tempArray.push(take);
      chunkId= take.chunk;
    }
  }
  return {chunkId: chunkId, takes: tempArray};
}

export const getAlternateTakesSuccess = (alternateTakes) => {
  return {
    type: 'FETCH_ALTERNATE_TAKES',
    alternateTakes,
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

export const getSelectedTakes = (chapterId, redirect, chapterNav) => {
  return dispatch => {
    dispatch({type: 'LOADING'});
    return axios
      .get(`${config.apiUrl}chunks/?chapter_id=${chapterId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') },
        })
      .then(response => {
        let chunks = response.data;
        let selectedTakes = [];


        for (var x=0; x<chunks.length; x++) {
          if (chunks.published_take !== null) {
            selectedTakes.push({publishedTake: chunks[x].published_take,
              chunkNum: chunks[x].startv, playing: false});
          }
        }
        dispatch(getSelectedTakesSuccess(selectedTakes));
      })
      .catch(error => {
        console.log(error);
        redirect.push('./ErrorPage');
      });
  };
};

export const getSelectedTakesSuccess = (chunks) => {
  return {
    type: 'FETCH_CHUNKS',
    selectedTakes: chunks,
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


export function updateTake() {
  return {
    type: 'UPDATE_TAKE',
  };
}

export function togglePlay(playing) {
  return {
    type: 'PLAY_PAUSE_SELECTED_TAKE',
    playing,
  };
}

export function updateActiveChunkIndex(activeChunkIndex,index) {
  if (index !==null) {
    console.log('index is not null')
    return {
      type: 'UPDATE_ACTIVE_CHUNK_INDEX',
      index,
    };
  }

  else {
    return {
      type: 'UPDATE_ACTIVE_CHUNK_INDEX',
      index: activeChunkIndex+1,
    };
  }
}
