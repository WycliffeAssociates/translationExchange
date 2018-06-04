/* global it describe expect  jest*/
import React from 'react';
import {shallow} from 'enzyme';
import {ProjectContainer} from '../../../../js/pages/projects/ProjectPage';

const mockProps =  {
  loading: false,
  txt: {
    moreText: 'more text',
  },
  fetchAllProjects: jest.fn(),
};

describe('Project Page test suite', () => {

  const wrapper = shallow(<ProjectContainer {...mockProps} />);

  it('should render the component correctly', () => {
    expect(wrapper.find('Container').length).toBe(1);
    expect(wrapper.find('ProjectsContainer').length).toBe(1);
    expect(wrapper.find('CardsContainer').length).toBe(1);
  });

});
