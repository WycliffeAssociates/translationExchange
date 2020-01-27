/* global describe it test expect jest */
import React from 'react';
import {AvailableUsers} from '../../../../js/pages/Login/AvailableUsers';
import {shallow} from 'enzyme';

const mockProps = {
  txt: {
    get: jest.fn()
  },
  users: [{is_social: false, id: 1}, {is_social: true, id: 2}],
  fetchUsers: jest.fn(),
};
describe('LoginPage test suite', () => {
  const wrapper = shallow(<AvailableUsers {...mockProps} />);
  it('renders the LoginPage correctly', () => {
    expect(wrapper.find('Container').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('Grid').length).toBe(1);
  });
});
