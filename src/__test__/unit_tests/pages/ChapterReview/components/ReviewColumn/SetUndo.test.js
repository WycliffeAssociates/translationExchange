/* global expect it describe jest test*/
import React from 'react';
import SetUndo from '../../../../../../js/pages/ChapterReview/components/ReviewColumn/SetUndo';
import {shallow} from 'enzyme';

const mockProps = {
  chunkId: 12,
  take: {
    publishedTake: {
      id: 1,
      location: '/take/location',
    },
    chunk: 12,
  }, index: 1,
  saveComment: jest.fn(),
  swapTake: jest.fn(), undoSwapTake: jest.fn(),
  tempTakes: [], setTake: jest.fn(), txt: 'txt',
  location: '/location/example...', active: false,
};

describe('SetUndo test suite', () => {
  const wrapper = shallow(<SetUndo {...mockProps} />);

  it('should render the componet w/o exploding', () => {
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('SetButton').length).toEqual(1);
    expect(wrapper.find('UndoButton').length).toEqual(1);
    expect(wrapper.find('RecordCommentsModal').length).toEqual(1);

  });

  test('the UndoButton on click', ()=> {
    const button = wrapper.find('UndoButton');
    button.simulate('click');
    expect(mockProps.undoSwapTake.mock.calls.length).toEqual(1);
  });

  test(' the SetButton on click', () => {
    const button = wrapper.find('SetButton');
    button.simulate('click');
    expect(wrapper.instance().state.displayModal).toBe(true);
  });

  test('the closeModal function', () => {
    wrapper.instance().closeModal();
    expect(wrapper.instance().state.displayModal).toBe(false);
    expect(mockProps.setTake.mock.calls.length).toEqual(1);
  });



});
