import { PLAY_AUDIO, STOP_AUDIO, FINISHED_PLAYING, UPDATE_TIME, UPDATE_AUDIO_LENGTH, RESET_AUDIOPLAYER } from '../reduxConstants';

const INITIAL_STATE = {
  play: false,
  isFinished: false,
  updatedTime: 0,
  audioLength: 0,
};

export default (state = INITIAL_STATE, action = {}) => {

  switch (action.type) {



    case PLAY_AUDIO:
      return {
        ...state,
        play: true,
      };

    case STOP_AUDIO:
      return {
        ...state,
        play: false,
      };

    case FINISHED_PLAYING:
      return {
        ...state,
        isFinished: action.isFinished,
      };

    case UPDATE_TIME:
      return {
        ...state,
        updatedTime: action.updateTime,
      };

    case UPDATE_AUDIO_LENGTH:
      return {
        ...state,
        audioLength: action.timeLength,
      };

    case RESET_AUDIOPLAYER:
      return INITIAL_STATE ;

    default:
      return state;
  }



};
