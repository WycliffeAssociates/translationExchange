/* global it:true describe:true expect:true*/
import React from 'react';
import {shallow} from 'enzyme';
import {CreateUserContainer} from '../../../../../js/pages/user/components/CreateUserContainer';

const mockProps = {
  history: [],
  userCreated: false,
  txt: {
    get: jest.fn()
  },
};

describe('Create User Container Suite', function() {
  const wrapper = shallow(<CreateUserContainer  {...mockProps} />);

  it('should render without exploding', function() {
    expect(wrapper.find(<div className="pageBackground" />));

  });

  it('should render CreateUser Interface', function() {
    expect(wrapper.find('CreateUser').length).toBe(1);
  });

  it('should navigate back on label click', () => {
    const label = wrapper.find('Label');
    label.simulate('click');
    expect(mockProps.history.length).toBe(1);
  });

  mockProps.userCreated = true;

  it('should render UserCreated Interface', function() {
    const newWrapper = shallow(<CreateUserContainer {...mockProps} />);
    expect(newWrapper.find('UserCreated').length).toBe(1);
  });
});
