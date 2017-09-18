import { UPDATE_PLAYLIST, MULTIPLE_TAKES, UPDATE_MODE, PLAY_TAKE } from './types';


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

export const updateMode = (mode) => {                       // update mode, chunk or verse

  return {
    type: UPDATE_MODE,
    mode
  }
};

export const multipleTakes = (status) => {

  return {
    type: MULTIPLE_TAKES,
    status
  }

};
