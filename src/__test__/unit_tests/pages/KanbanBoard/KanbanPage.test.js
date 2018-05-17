/* global it expect describe jest*/
import React from 'react';
import {KanbanPage} from '../../../../js/pages/KanbanBoard/KanbanPage';
import {shallow} from 'enzyme';

const mockProps = {
  location: '',
  getComments: jest.fn(),
  getChunks: jest.fn(),
  takes: [],
  history: [],
  updateLanguage: jest.fn(),
  chunk: [],
};

describe('KanbanPage test suite', () => {

  const wrapper = shallow(<KanbanPage {...mockProps} />);
  it('renders the component correctly', () => {
    expect(wrapper.find('KanbanPageContainer').length).toBe(1);
    expect(wrapper.find('NavBar').length).toBe(1);
    expect(wrapper.find('KanbanContainer').length).toBe(1);
    expect(wrapper.find('KanbanBoard').length).toBe(1);
    expect(wrapper.find('UtilityPanel').length).toBe(1);
    expect(wrapper.find('SourceAudio').length).toBe(1);

  });

});
