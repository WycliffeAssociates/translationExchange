/* global it: true   expect:true  describe:true*/
import React from 'react';
import TaskTitle from '../../../../../js/pages/tasks/components/TaskTitle';
import {shallow} from 'enzyme';

const mockProps = {
  task: {
    "status": null,
    "progress": 50,
    "details": {}
  }
};

describe('Task Title Test Suite', () => {
  const wrapper = shallow(<TaskTitle {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('BookTitle').length).toEqual(1);
    expect(wrapper.find('LanguageTitle').length).toEqual(1);
  });
});
