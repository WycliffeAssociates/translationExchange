/*global describe it expect jest*/
import React from 'react';
import {shallow} from 'enzyme';
import ProjectCard from '../../../../../js/pages/projects/components/ProjectCard';

describe.skip('Project Card Test Suite', () => {       // This test is skipped because there are some issues while testing jdenticon TypeError: _jdenticon2.default.update is not a function
  const mockProps = {
    bookName: 'genesis',
    version: 'ulb',
    history: [],
    dateModified: '5/1/18',
    language: 'eng',
    txt: {
      review: 'review',
    },
    mode: 'chunk',
    getChapters: jest.fn(),

  };

  const wrapper = shallow(<ProjectCard {...mockProps} />);

  it('should render the component correctly', () => {

    expect(wrapper.find('Card').length).toBe(1);
    expect(wrapper.find('InformationContainer').length).toBe(1);
    expect(wrapper.find('ButtonsContainer').length).toBe(1);

  });


});
