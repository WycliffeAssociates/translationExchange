/* global expect it describe jest*/
import React from 'react';
import SelectedTake from '../../../../../../js/pages/ChapterReview/components/ReviewColumn/SelectedTake';
import {shallow} from 'enzyme';

const mockProps = {
  take: {
    publishedTake: {
      id: 1,
      location: '/take/location',
    },
    chunk: 12,
  }, alternateTakes: [], index: 1,
  resetPos: jest.fn(), selectedTakesLength: 10,
  updateActiveChunkIndex: jest.fn(), activeChunkIndex: 2,
  resetTake: jest.fn(), saveComment: jest.fn(),
  swapTake: jest.fn(), undoSwapTake: jest.fn(),
  tempTakes: [], setTake: jest.fn(), txt: 'txt',
  location: '/location/example...', active: false,
};

describe('Selected Take test suite', ()=> {
  const wrapper = shallow(<SelectedTake {...mockProps} />);

  it('should render the component w/o exploding', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('Take').length).toEqual(1);
    expect(wrapper.find('Comments').length).toEqual(1);
  });
});
