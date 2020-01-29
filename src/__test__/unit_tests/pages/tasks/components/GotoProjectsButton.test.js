/* global it: true   expect:true  describe:true*/
import React from 'react';
import GotoProjectsButton from '../../../../../js/pages/tasks/components/GotoProjectsButton';
import {shallow} from 'enzyme';

const mockProps = {
  history: [],
  task: {
    details: {}
  },
  txt: { get: jest.fn() }
};

describe('GotoProjectButton Test Suite', () => {
  const wrapper = shallow(<GotoProjectsButton {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('Button').length).toEqual(1);
  });

  it('should handle the onClick function', () => {
    wrapper.find('Button').simulate('click');
    expect(mockProps.history.length).toEqual(1);
  });

});
