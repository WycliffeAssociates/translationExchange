/* global expect it describe jest test*/
import React from 'react';
import ReviewColumn from '../../../../../../js/pages/ChapterReview/components/ReviewColumn';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

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
  location: '/location/example...',
};

describe('Review Column test suite', () => {
  it('should render the component w/o exploding', ()=> {
    const wrapper = shallow(<ReviewColumn {...mockProps} />);
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('SelectedTake').length).toEqual(1);
    expect(wrapper.find('ListView').length).toEqual(1);
  });

});
