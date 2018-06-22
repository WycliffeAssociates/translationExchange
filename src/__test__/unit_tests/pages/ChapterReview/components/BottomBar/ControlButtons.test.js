/* global expect it describe jest test*/
import React from 'react';
import ControlButtons from '../../../../../../js/pages/ChapterReview/components/BottomBar/ControlButtons';
import {shallow} from 'enzyme';

const mockProps = {
  activeChunkIndex: 1,
  selectedTakesLength: 10,
  updateActiveChunkIndex: jest.fn(),
  resetTake: jest.fn(),
  togglePlay: jest.fn(),
  togglePlayingTakes: jest.fn(),
  takesPlaying: true,
};
describe('Control Buttons test suite', () => {
  const wrapper = shallow(<ControlButtons {...mockProps} />);
  it('should render the component w/o exploding', () => {
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('PlayButton').length).toEqual(1);
    expect(wrapper.find('SkipPrevious').length).toEqual(1);
    expect(wrapper.find('SkipNext').length).toEqual(1);
  });

  test('skip function with on click', ()=> {
    const button = wrapper.find('SkipNext');
    button.simulate('click');
    expect(mockProps.updateActiveChunkIndex.mock.calls.length).toEqual(1);
    expect(mockProps.resetTake.mock.calls.length).toEqual(1);

    const button2 = wrapper.find('SkipPrevious');
    button2.simulate('click');
    expect(mockProps.updateActiveChunkIndex.mock.calls.length).toEqual(2);
    expect(mockProps.resetTake.mock.calls.length).toEqual(2);
  });

  test('handleClick function', ()=> {
    const button3 =  wrapper.find('PlayButton');
    button3.simulate('click');
    expect(mockProps.togglePlay.mock.calls.length).toEqual(1);
    expect(mockProps.togglePlayingTakes.mock.calls.length).toEqual(1);


    //call again to touch else statement
    button3.simulate('click');
    expect(mockProps.togglePlay.mock.calls.length).toEqual(2);
    expect(mockProps.togglePlayingTakes.mock.calls.length).toEqual(2);

  });

  test('componentWillReceiveProps function', ()=> {
    wrapper.instance().componentWillReceiveProps({stopPlaying: true});
    expect(mockProps.togglePlay.mock.calls.length).toEqual(3);
    expect(mockProps.togglePlayingTakes.mock.calls.length).toEqual(3);

  });
});
