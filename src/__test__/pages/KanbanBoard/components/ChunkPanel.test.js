/* global describe it expect */
import React from 'react';
import {shallow} from 'enzyme';
import ChunkPanel from '../../../../js/pages/KanbanBoard/components/ChunkPanel';

const mockProps = {
  chunks: [{
    startv: 1,
    published_take: null,
    id: 1,

  },
  {
    startv: 3,
    published_take: null,
    id: 2,

  },

  {
    startv: 7,
    published_take: {
      location: 'some location',
      id: 3,
    },
  }],
};


describe('ChunkPanel suite', () => {
  const wrapper = shallow(<ChunkPanel {...mockProps} />);
  it('should render the chunkPanel correctly', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should render one PlayerTracker', ()=> {
    expect(wrapper.find('PlayerTracker').length).toEqual(1);
  });

  it('should render 2 Labels without players (published_take=null)',() => {
    expect(wrapper.find('CurrentLabel').length).toEqual(2);
  });
});
