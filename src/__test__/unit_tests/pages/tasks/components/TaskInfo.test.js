/* global it: true   expect:true  describe:true*/
import React from 'react';
import TaskInfo from '../../../../../js/pages/tasks/components/TaskInfo';
import {shallow} from 'enzyme';

const mockProps = {
  task: {
    "status": null,
    "progress": 100,
    "details": {}
  },
  location: {
    search: 'progress',
  },
};

describe('Task Info Test Suite', () => {
  const wrapper = shallow(<TaskInfo {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('Title').length).toEqual(1);
    expect(wrapper.find('Details').length).toEqual(1);
    expect(wrapper.find('GotoProjectButton').length).toEqual(0);
  });

  mockProps.task.status = "SUCCESS";
  const hasButton = shallow(<TaskInfo {...mockProps} />);
  it('should render GotoProjectButton when task status is "Success"', ()=> {
    expect(hasButton.find('GotoProjectButton').length).toEqual(1);
  });
});
