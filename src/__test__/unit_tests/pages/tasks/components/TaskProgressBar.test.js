/* global it: true   expect:true  describe:true*/
import React from 'react';
import TaskProgressBar from '../../../../../js/pages/tasks/components/TaskProgressBar';
import {shallow} from 'enzyme';

const mockProps = {
  task: {
    "status": null,
    "progress": 50
  },
};

describe('Task ProgressBar Test Suite', () => {
  const wrapper = shallow(<TaskProgressBar {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('ProgressBar').length).toEqual(1);
  });

});
