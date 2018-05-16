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

    expect(wrapper.find('KanbanPageContainer'));
    expect(wrapper.find('NavBar'));
    expect(wrapper.find('KanbanContainer'));
    expect(wrapper.find('KanbanBoard'));
    expect(wrapper.find('UtilityPanel'));
    expect(wrapper.find('SourceAudio'));

  });

});
