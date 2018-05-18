/* global test it expect describe jest */
import React from 'react';
import { shallow } from 'enzyme';
import WaveForm from '../../../../../../js/pages/takes/components/audioplayer/Waveform';

const mockProps = {
  audioFile: 'audioFile',
  playing: false,
  options: {},
  finishedPlaying: jest.fn(),
  trackPos: jest.fn(),
};
describe('WaveForm test suite', () => {
  const wrapper = shallow(<WaveForm {...mockProps} />);

  it('should render the waveform correctly', () => {
    expect(wrapper.find('t').length).toBe(1);
  });

  test('handlePosChange function', () => {
    const e = {
      originalArgs: [2,3,4,5],
    };
    wrapper.instance().handlePosChange(e);
    expect(wrapper.instance().state.pos).toEqual(2);
    expect(mockProps.trackPos.mock.calls.length).toBe(1);
  });
});
