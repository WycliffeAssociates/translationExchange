/* global describe it expect test jest*/
import React from 'react';
import PlayerTracker from '../../../js/components/PlayerTracker';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
const state = {
  playing: false,
  played: 0,
  playedSeconds: 0,
};

const mockProps = {
  audioFile: '',
  url: '',
};

describe('Player Tracker Test Suite', () => {
  const wrapper = shallow(<PlayerTracker {...mockProps} />);

  it('should render the component successfully', () => {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should render play head', () => {
    expect(wrapper.find('PlayIcon').length).toEqual(2); //2 because one is hidden one is visible
  });

  it('should handle onClick function', () => {
    const PlayIcon = wrapper.find('PlayIcon').first().dive();
    PlayIcon.simulate('click');
    expect(wrapper.instance().state.playing).toEqual(true);
  });

  it('should Render ReactPlayer', () => {
    expect(wrapper.find('ReactPlayer').length).toEqual(1);
  });

  test('onProgress function, ()', () => {
    wrapper.instance().onProgress();
    expect(wrapper.instance().state).toEqual({ playerTime: 0,
      interval: '',
      playing: true,
      url: null,
      loop: false,
      loaded: 0,
      loadedSeconds: 0,
      duration: 0,
      played: 0,
      playedSeconds: 0,
      flagFinished: false }); //the initialState bc the player isn't actually running/updating
  });

  test(' onEnd function', ()=> {
    wrapper.instance().onEnd();
    setTimeout(()=> {expect(wrapper.instance().state.played).toEqual(0);
      expect(wrapper.instance().state.playedSeconds).toEqual(0);
      expect(wrapper.instance().state.playing).toEqual(false);}, 1000);

  });
});
