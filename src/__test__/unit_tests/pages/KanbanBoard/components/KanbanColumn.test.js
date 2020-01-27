/* global describe it expect jest*/
import React from 'react';
import {shallow} from 'enzyme';
import KanbanColumn from '../../../../../js/pages/KanbanBoard/components/KanbanColumn';

const mockProps = {
  publishedColumn: true,
  icon: 4,
  array: [1,2],
  displayText: {take: 'Take', count: '1'},
  getComments: jest.fn(),
  publishedTake: true,
  location: {
    search: 'location/search/test',
  },
  chunks: [{id: '1', startv: '1'}, {id: '2', startv: '3'}], /* mock chunks for nextChunk fucntion */
  activeChunkId: 0,
  history: [],
  getTakes: jest.fn(),
  getChunks: jest.fn(),
  txt: {
    get: jest.fn()
  },
};

const OriginalKanbanColumn = KanbanColumn.DecoratedComponent;
const identity = el => el;

describe('KanbanColumn suite', function() {
  const wrapper = shallow(<OriginalKanbanColumn {...mockProps}
    connectDropTarget={identity} />);

  it ('should render the component without error', function() {
    expect(wrapper.find('Column').length).toEqual(1);
  });

  // it('should render the correct icon for the column', () => {
  //   expect(wrapper.find('svg.svg-inline--fa fa-check fa-w-16 fa-2x').length).toBe(1);
  // });

  it ('should navigate to next Chunk', function() {
    const NextChunkButton = wrapper.find('NextChunk');
    NextChunkButton.simulate('click');
    expect(wrapper.instance().props.getTakes.mock.calls.length).toEqual(1);
  });

});

const mockPropsPChapter = {
  publishedColumn: true,
  icon: 4,
  array: [1,2],
  displayText: {take: 'Take', count: '1'},
  getComments: jest.fn(),
  publishedTake: true,
  location: {
    search: 'location/search/test',
  },
  chunks: [0,1,2,3], /* mock chunks just for length */
  activeChunkId: 4,
  history: [],
  getTakes: jest.fn(),
  getChunks: jest.fn(),
  txt: {
    get: jest.fn()
  },
};


describe ('KanbanColumn suite published Take', function() {
  const wrapper = shallow(<OriginalKanbanColumn {...mockPropsPChapter}
    connectDropTarget= {identity} />);

  it('should render the component without error', function() {
    expect(wrapper.find('Column').length).toEqual(1);  });

  it.skip ('should navigate to the next chapter', function() {
    const NextChapterButton = wrapper.find('NextChapter');
    NextChapterButton.simulate('click');
    expect(wrapper.instance().props.history.length).toEqual(1);
  });
});
