/* global expect it describe jest test*/
import React from 'react';
import ListView from '../../../../../../js/pages/ChapterReview/components/ReviewColumn/ListView';
import {shallow} from 'enzyme';

const mockProps = {
  chunkId: 12,
  take: {
    publishedTake: {
      id: 1,
      location: '/take/location',
    },
  }, alternateTakes: [{
    chunkId: 12,
    takes: [
      {id: 742, take_num: 3},
      {id: 122, take_num: 7}],
  }, {
    chunkId: 15,
    takes: [
      {id: 742, take_num: 3},
      {id: 122, take_num: 7}],
  }], index: 1,
  resetPos: jest.fn(), selectedTakesLength: 10,
  updateActiveChunkIndex: jest.fn(), activeChunkIndex: 2,
  resetTake: jest.fn(), saveComment: jest.fn(),
  swapTake: jest.fn(), undoSwapTake: jest.fn(),
  tempTakes: [], setTake: jest.fn(), txt: 'txt',
  location: '/location/example...', active: false,
};

describe('List view test suite', () => {
  const wrapper = shallow(<ListView {...mockProps} />);
  wrapper.setState({placeHolderCount: 2});
  it('should render the component w/o exploding', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('ListItem').length).toEqual(4);
    expect(wrapper.find('TakeNum').length).toEqual(2);
    expect(wrapper.find('TouchTarget').length).toEqual(2);
    expect(wrapper.find('Rating').length).toEqual(2);

  });
});
