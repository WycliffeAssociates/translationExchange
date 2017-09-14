import { PLAY_AUDIO, STOP_AUDIO, FINISHED_PLAYING, UPDATE_DATA} from './types';


export const playAudio = () => {
  return {
    type: PLAY_AUDIO
  }
};

export const stopAudio = () => {
  return {
    type: STOP_AUDIO
  }
};


export const finishedPlaying = (isFinished) => {

  return{
     type: FINISHED_PLAYING,
     isFinished

  }

};


export const dataDisplay = (AuthorData) => {

  return{
     type: UPDATE_DATA,
     AuthorData

  }

};
