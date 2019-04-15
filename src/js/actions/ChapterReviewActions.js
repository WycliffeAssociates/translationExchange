import axios from 'axios';
import config from '../../config/config';
import {GET_SELECTED_TAKES}  from '../reduxConstants'

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
    type: GET_SELECTED_TAKES,
    selectedTakes: chunks,
  };
};

// set take using patch
export const setTake = (
  publishedTakeId,
  tempTakes,
  index,
  alternateTakes
) => {
  return function(dispatch) {

    axios
      .patch(config.apiUrl + 'takes/' + publishedTakeId+ '/', {published: true, rating: 3},{
        headers: { Authorization: 'Token ' + localStorage.getItem('token') },
      });

    axios
      .patch(config.apiUrl + 'takes/' + tempTakes.publishedTake.id + '/', {published: false, rating: 3},{
        headers: { Authorization: 'Token ' + localStorage.getItem('token') },
      })
      .then(response => {
        const take= response.data;
        alternateTakes.forEach((chunk, chunkIndex) => {
          if (chunk.chunkId === take.chunk) {
            chunk.takes.forEach((take, takeIndex) => {
              if (take.id == publishedTakeId) {
                dispatch({
                  type: 'UPDATE_ALTERNATE_TAKES',
                  take: take,
                  oldId: publishedTakeId, /* use the id of the new publishedTake(the old atlernate take)
                                        to remove the take from vthe alternateTakes array*/
                  takeIndex,
                  chunkIndex,
                  tempTakeIndex: index,
                });
              }
            });
          }
        });
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

export function swapTake(take, index) {
  return {
    type: 'SWAP_TAKE',
    take,
    index,
  };
}

export function undoSwapTake(take, index) {
  return {
    type: 'UNDO_SWAP',
    take,
    index,
  };
}


export function togglePlay(playing) {
  return {
    type: 'PLAY_PAUSE_SELECTED_TAKE',
    playing,
  };
}

export function updateActiveChunkIndex(activeChunkIndex,index, takesPlaying) {
  if (index !==null && index !== 'done') {
    return {
      type: 'UPDATE_ACTIVE_CHUNK_INDEX',
      index,
      takesPlaying,
    };
  }

  else if (index === 'done') {
    return {
      type: 'FINISH_PLAYING',
      index: activeChunkIndex,
      takesPlaying,
    };
  }

  else {
    return {
      type: 'UPDATE_ACTIVE_CHUNK_INDEX',
      index: activeChunkIndex+1,
      takesPlaying,
    };
  }
}

export function clearAlternateTakes() {
  return {
    type: 'CLEAR_ALTERNATE_TAKES',
  };
}

export function clearSelectedTakes() {
  return {
    type: 'CLEAR_SELECTED_TAKES',
  };
}