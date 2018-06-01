/* global expect describe it */
import reducer from '../../../js/reducers/AudioPlayerReducer';
import * as types from '../../../js/reduxConstants';
describe('AudioPlayerReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined,{})).toEqual({
      play: false,
      isFinished: false,
      updatedTime: 0,
      audioLength: 0,
    });
  });

  it('should handle PLAY_AUDIO',() => {
    expect(reducer([], {
      type: types.PLAY_AUDIO,
    })).toEqual({
      play: true,
    });
  });

  it('should handle STOP_AUDIO',() => {
    expect(reducer([], {
      type: types.STOP_AUDIO,
    })).toEqual({
      play: false,
    });
  });

  it('should handle FINISHED_PLAYING',() => {
    expect(reducer([], {
      type: types.FINISHED_PLAYING,
      isFinished: true,
    })).toEqual({
      isFinished: true,
    });
  });

  it('should handle UPDATE_TIME',() => {
    expect(reducer([], {
      type: types.UPDATE_TIME,
      updateTime: 30,
    })).toEqual({
      updatedTime: 30,
    });
  });

  it('should handle UPDATE_AUDIO_LENGTH',() => {
    expect(reducer([], {
      type: types.UPDATE_AUDIO_LENGTH,
      timeLength: 75,
    })).toEqual({
      audioLength: 75,
    });
  });

  it('should handle RESET_AUDIOPLAYER',() => {
    expect(reducer([], {
      type: types.RESET_AUDIOPLAYER,
    })).toEqual({
      play: false,
      isFinished: false,
      updatedTime: 0,
      audioLength: 0,
    });
  });



});
