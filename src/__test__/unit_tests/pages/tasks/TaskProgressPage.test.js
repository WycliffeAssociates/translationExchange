/* global it: true   expect:true  describe:true jest*/
import React from 'react';
import {TaskProgressPage} from '../../../../js/pages/tasks/TaskProgressPage';
import {shallow} from 'enzyme';

const mockProps = {
  getTasks: jest.fn(),
  location: {
    search: 'hereIam',
  },
};

describe('Task Progress Page Test Suite', () => {
  const wrapper = shallow(<TaskProgressPage {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('TaskProgressPageContainer').length).toEqual(1);
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('NavBar').length).toEqual(1);
    expect(wrapper.find('TaskProgressContainer').length).toEqual(1);
    expect(wrapper.find('TaskProgress').length).toEqual(1);
    expect(wrapper.find('GotoProjectsButton').length).toEqual(1);
  });

});
