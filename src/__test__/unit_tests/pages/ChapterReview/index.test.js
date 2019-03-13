/* global expect it describe jest test*/
import React from 'react';
import {ChapterReview} from '../../../../js/pages/ChapterReview';
import {shallow} from 'enzyme';

const mockProps = {
  location: {
    search: 'chapterId=3&chapterNum=3&bookName=1%20John&projectId=1&&mode=Chunk',
  },
  history: [],
  alternateTakes: [],
  selectedTakes: [{chunkId: 1, publishedTake: {
    id: 1},
  },
  {chunkId: 2, publishedTake: {
    id: 4},
  },
  {chunkId: 3, publishedTake: {
    id: 99},
  },
  {chunkId: 4, publishedTake: {
    id: 5},
  }],
  activeChunkIndex: 1, setTake: jest.fn(), stopPlaying: jest.fn(),
  saveComment: jest.fn(), togglePlay: jest.fn(), updateActiveChunkIndex: jest.fn(),
  swapTake: jest.fn(), clearAlternateTakes: jest.fn(), undoSwapTake: jest.fn(),
  tempTakes: jest.fn(), txt: 'txt',
  getSelectedTakes: jest.fn(),
  getAlternateTakes: jest.fn(),
};

describe('Chapter Review test suite', ()=> {
  const wrapper = shallow(<ChapterReview {...mockProps} />);
  it('should render the components w/o breaking', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('ReviewColumnsContainer').length).toEqual(1);
    expect(wrapper.find('BottomBar').length).toEqual(1);
    expect(wrapper.find('ReviewColumn').length).toEqual(4);
  });

  test(' the reset Take function', () => {
    wrapper.instance().resetTake(true);
    expect(wrapper.instance().state.resetPos).toBe(true);
  });

  test(' to the togglePlayingTakes function' , () => {
    wrapper.instance().togglePlayingTakes();
    expect(wrapper.instance().state.takesPlaying).toBe(true);

    wrapper.instance().togglePlayingTakes();
    expect(wrapper.instance().state.takesPlaying).toBe(false);

  });
});
