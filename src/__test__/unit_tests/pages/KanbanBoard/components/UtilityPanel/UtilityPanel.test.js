/* global describe it expect test jest*/
import React from 'react';
import {shallow} from 'enzyme';
import UtilityPanel from '../../../../../../js/pages/KanbanBoard/components/UtilityPanel/UtilityPanel';


const mockProps = {
  takes: [{id: 1, rating: 1, published: false},
    {id: 2, rating: 2, published: false},
    {id: 3, rating: 3, published: false},
    {id: 4, rating: 3, published: true}],
  chunkNum: 1,
  location: {
    search: 'search',
  },
  chunks: [],
  chapterComments: [],
  chunkComments: [],
  activeChunkId: 1,
  saveComment: jest.fn(),
  uploadingComments: jest.fn(),
  uploadError: jest.fn(),
  resetError: jest.fn(),
  txt: {
    get: jest.fn()
  },
  deleteComment: jest.fn(),
  getTakes: jest.fn(),
};

describe('UtilityPanel test suite', () => {
  const wrapper = shallow(<UtilityPanel {...mockProps} />);

  it('should render the component correctly', () => {
    expect(wrapper.find('ChunkPanel').length).toBe(1);
    expect(wrapper.find('UtilityPanelNotVisible').length).toBe(0);
    expect(wrapper.find('UtilityPanelContainer').length).toBe(1);
    expect(wrapper.find('UtilityNavigation').length).toBe(1);
    expect(wrapper.find('Hide').length).toBe(1);
    expect(wrapper.find('Show').length).toBe(0);
  });

  test('toggling the utilityPanel', () => {
    wrapper.instance().toggleUtilityPanel();
    expect(wrapper.instance().state.utilityPanel).toEqual(false);
    
  });

});
