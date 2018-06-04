import { PLAY_AUDIO, STOP_AUDIO, FINISHED_PLAYING, UPDATE_TIME, UPDATE_AUDIO_LENGTH, RESET_AUDIOPLAYER} from '../reduxConstants';


export const playAudio = () => {
  return {
    type: PLAY_AUDIO
  }
};

export const stopAudio = () => {
  return {
    type: STOP_AUDIO,
  };
};


export const finishedPlaying = (isFinished) => {

  return {
    type: FINISHED_PLAYING,
    isFinished,

  };

};


export const updateTime = (updateTime) => {

  return  {
    type: UPDATE_TIME,
    updateTime,

  };

};

export const timeLength = (timeLength) => {

  return {
    type: UPDATE_AUDIO_LENGTH,
    timeLength,

  };

};

export const resetAudioPlayer = () => {

  return {
    type: RESET_AUDIOPLAYER,


  };

};
