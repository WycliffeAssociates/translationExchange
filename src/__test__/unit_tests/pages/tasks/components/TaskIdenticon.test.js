/* global it: true   expect:true  describe:true*/
import React from 'react';
import TaskIdenticon from '../../../../../js/pages/tasks/components/TaskIdenticon';
import {shallow} from 'enzyme';

const mockProps = {
  task: {
    "id": "",
    "status": null,
    "progress": 100,
    "details": {}
  }
};

describe.skip('Task Identicon Test Suite', () => {
  const wrapper = shallow(<TaskIdenticon {...mockProps} />);

  it.skip('should render page successfully', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it.skip('should render all children successfully', ()=> {
    expect(wrapper.find('Identicon').length).toEqual(1);
    expect(wrapper.find('ReactPlayer').length).toEqual(1);
  });
});
