/* global describe it expect jest*/
import React from 'react';
import PlayerTracker from '../../../js/components/PlayerTracker';
import {shallow} from 'enzyme';

const state = {
  playing: false,
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
    expect(wrapper.find('PlayIcon').length).toEqual(2);
  });

  it('should handle onClick function', () => {
    const PlayIcon = wrapper.find('PlayIcon').first().dive();
    PlayIcon.simulate('click');
    expect(wrapper.instance().state.playing).toEqual(true);
  });

  it('should Render ReactPlayer', () => {
    expect(wrapper.find('ReactPlayer').length).toEqual(1);
  });
});
