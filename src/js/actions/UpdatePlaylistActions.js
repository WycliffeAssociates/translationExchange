import { UPDATE_PLAYLIST, MULTIPLE_TAKES, UPDATE_MODE } from './types';


export const updatePlaylist = (playlist) => {
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
