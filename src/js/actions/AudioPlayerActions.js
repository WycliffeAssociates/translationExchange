import { PLAY_AUDIO, STOP_AUDIO, FINISHED_PLAYING} from './types';


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
