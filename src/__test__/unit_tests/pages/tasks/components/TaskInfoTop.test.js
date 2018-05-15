/* global it: true   expect:true  describe:true*/
import React from 'react';
import TaskInfoTop from '../../../../../js/pages/tasks/components/TaskInfoTop';
import {shallow} from 'enzyme';

const mockProps = {
  task: {
    "status": null,
    "progress": 50
  },
};

describe('Task Info Top Test Suite', () => {
  const wrapper = shallow(<TaskInfoTop {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('TaskTitle').length).toEqual(1);
    expect(wrapper.find('DateTime').length).toEqual(1);
    expect(wrapper.find('TaskIdenticon').length).toEqual(1);
  });

});
