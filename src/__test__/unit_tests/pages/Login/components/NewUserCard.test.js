/* global describe it expect*/
import React from 'react';
import {shallow} from 'enzyme';
import NewUserCard from '../../../../../js/pages/Login/components/NewUserCard';

const defaultProps = {
  history: [],
  txt: {
    get: jest.fn()
  },
};
describe('NewUserCard suite', function() {
  const wrapper = shallow(<NewUserCard {...defaultProps} />);

  it('should render the compnenet without any error', function() {
    expect(wrapper.find('NewUserCardContainer').length).toBe(1);
  });

  it('should navigate to new user creation', function() {
    wrapper.simulate('click');
    expect(wrapper.instance().props.history.length).toEqual(1);
  });
});
