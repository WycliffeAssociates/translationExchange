/* global it: true   expect:true  describe:true*/
import React from 'react';
import TaskInfoLeft from '../../../../../js/pages/tasks/components/TaskInfoLeft';
import {shallow} from 'enzyme';

const mockProps = {
  task: {
    "status": null,
    "progress": 100
  },
};

describe('Task Info Left Test Suite', () => {
  const wrapper = shallow(<TaskInfoLeft {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('TaskInfo').length).toEqual(1);
    expect(wrapper.find('TaskIdenticon').length).toEqual(1);
  });

});
