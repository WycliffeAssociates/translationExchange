/* global it: true   expect:true  describe:true*/
import React from 'react';
import TaskProgress from '../../../../../js/pages/tasks/components/TaskProgress';
import {shallow} from 'enzyme';

const mockProps = {
  tasks: [],
};

describe('Task Progress Test Suite', () => {
  const wrapper = shallow(<TaskProgress {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should not render children when tasks are empty', ()=> {
    expect(wrapper.find('TaskItemProgress').length).toEqual(0);
    expect(wrapper.find('TaskItemFinished').length).toEqual(0);
  });

  mockProps.tasks = [
    {
      "id": "1",
      "status": "PROGRESS",
      "progress": 50
    }
  ]
  const progress = shallow(<TaskProgress {...mockProps} />);
  it('should render TaskItemProgress successfully', ()=> {
    expect(progress.find('TaskItemProgress').length).toEqual(1);
  });

  mockProps.tasks = [
    {
      "id": "2",
      "status": null,
      "progress": 50
    }
  ]
  const finished = shallow(<TaskProgress {...mockProps} />);
  it('should render TaskItemFinished successfully', ()=> {
    expect(finished.find('TaskItemFinished').length).toEqual(1);
  });

});
