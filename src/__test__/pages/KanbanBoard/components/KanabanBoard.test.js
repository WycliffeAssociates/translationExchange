/* global it expect describe*/
import React from 'react';
import {shallow} from 'enzyme';
import KanbanBoard from '../../../../js/pages/KanbanBoard/components/KanbanBoard';

const mockProps = {
  takes: [{id: '1', rating: '1', published: 'false'}, {id: '2', rating: '2', published: 'false'},
    {id: '3', rating: '3', published: 'false'}, {id: '4', rating: '3', published: 'true'}],
};

describe('KanbanBoard Suite', function() {

  const wrapper = shallow(<KanbanBoard {...mockProps} />);

  it('should render correctly', () => {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should render 4 KanbanColumns', () => {

    expect(wrapper.find('DropTarget(KanbanColumn)').length).toEqual(4);
  });

});
