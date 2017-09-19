import { UPDATE_PLAYLIST, MULTIPLE_TAKES, UPDATE_MODE, PLAY_TAKE, CLEAR_PLAYLIST, REMOVE_TAKE_FROM_PLAYLIST } from './types';


export const playTake = (take) => {
  return {
    type: PLAY_TAKE,
    take
  }
};
export const addToPlaylist = (playlist) => {
  return {
    type: UPDATE_PLAYLIST,
    playlist
  }
};

export const clearPlaylist = () => {                                // action used to clear the take played from card
  return {
    type: CLEAR_PLAYLIST

  }

};

export const updateMode = (mode) => {                       // update mode, chunk or verse

  return {
    type: UPDATE_MODE,
    mode
  }
};

export const multipleTakes = (status) => {             // boolean to check if the audio player is in playlist mode

  return {
    type: MULTIPLE_TAKES,
    status
  }

};


export const removeTakeFromPlaylist = (index) => {

  return {
    type: REMOVE_TAKE_FROM_PLAYLIST,
    index
  }

};
