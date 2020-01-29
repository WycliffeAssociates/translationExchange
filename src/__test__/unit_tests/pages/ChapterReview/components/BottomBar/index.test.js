/* global expect it describe jest test*/
import React from 'react';
import BottomBar from '../../../../../../js/pages/ChapterReview/components/BottomBar';
import {shallow} from 'enzyme';

const mockProps ={
  activeChunkIndex: 1,
  togglePlay: jest.fn(),
  stopPlaying: jest.fn(),
  txt: {
    get: jest.fn()
  },
  updateActiveChunkIndex: jest.fn(),
  resetTake: jest.fn(),
  history: [],
  selectedTakesLength: 10,
  location: {
    search: 'location/at/this/point',
  },
  clearAlternateTakes: jest.fn(),
  clearSelectedTakes: jest.fn(),
};
describe('Bottom bar test suite', ()=> {
  const wrapper = shallow(<BottomBar {...mockProps} />);
  it('should render the component w/o exploding',() => {
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('ChapterInfo').length).toEqual(1);
    expect(wrapper.find('ControlButtons').length).toEqual(1);
    expect(wrapper.find('ExitButton').length).toEqual(1);
    expect(wrapper.find('NextChapterButton').length).toEqual(1);
  });

  test('onClick function',() => {
    const button = wrapper.find('ExitButton');
    button.simulate('click');
    expect(mockProps.updateActiveChunkIndex.mock.calls.length).toEqual(1);
    expect(mockProps.clearAlternateTakes.mock.calls.length).toEqual(1);
    expect(mockProps.clearSelectedTakes.mock.calls.length).toEqual(1);
  });

  test('should navigate to the next chapter', () => {
    const NextChapterButton = wrapper.find('NextChapterButton');
    NextChapterButton.simulate('click');
    expect(wrapper.instance().props.history.length).toEqual(1);
    expect(mockProps.updateActiveChunkIndex.mock.calls.length).toEqual(1);
    expect(mockProps.clearAlternateTakes.mock.calls.length).toEqual(1);
    expect(mockProps.clearSelectedTakes.mock.calls.length).toEqual(1);
  });
});
