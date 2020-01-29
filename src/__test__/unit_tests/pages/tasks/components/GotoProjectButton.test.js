/* global it: true   expect:true  describe:true*/
import React from 'react';
import GotoProjectButton from '../../../../../js/pages/tasks/components/GotoProjectButton';
import {shallow} from 'enzyme';

const mockProps = {
  history: [],
  task: {
    details: {},
  },
  txt: {
    get: jest.fn()
  },
};

describe('GotoProjectButton Test Suite', () => {
  const wrapper = shallow(<GotoProjectButton {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('Button').length).toEqual(1);
  });

  it('should handle the onClick function', () => {
    wrapper.find('Button').simulate('click');
    expect(mockProps.history.length).toEqual(1);
  });

});
