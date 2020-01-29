/* global describe it expect test jest*/
import React from 'react';
import {shallow} from 'enzyme';
import ChunkPanel from '../../../../../../js/pages/KanbanBoard/components/UtilityPanel/ChunkPanel';

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
  txt: {
    get: jest.fn()
  },
  history: [],
  location: {
    search: 'address bar location',
  },
  getTakes: jest.fn(),
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

  test('onClick function from label',() => {
    wrapper.find('label').first().simulate('click');
    expect(mockProps.getTakes.mock.calls.length).toEqual(1);
  });

  test('navigateChunk function', () => {
    wrapper.instance().navigateChunk(1,1);
    expect(mockProps.getTakes.mock.calls.length).toEqual(2);
  });
});