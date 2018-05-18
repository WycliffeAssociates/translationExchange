/* global it:true describe:true expect: true  jest:true*/
import React from 'react';
import {shallow} from 'enzyme';
import PlayPauseBtn from '../../../../../js/pages/user/components/PlayPauseBtn';

const mockProps = {
  playing: false,
  startPlaying: jest.fn(),
};
const wrapper = shallow(<PlayPauseBtn {...mockProps} />);

describe('Play puase button suite', function() {


  it('should render correctly', function() {
    expect(wrapper.find('ButtonContainer').length).toBe(1);
  });

  it('should handleClick correctly', function() {
    const button = wrapper.find('PlayButton');
    button.simulate('click');
    expect(wrapper.instance().state.icon).toBe('pause');
    expect(wrapper.instance().props.startPlaying.mock.calls.length).toBe(1);
  });
});
