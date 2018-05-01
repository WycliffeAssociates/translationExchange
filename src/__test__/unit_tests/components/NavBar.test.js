/* global describe it expect jest*/
import React from 'react';
import NavBar from '../../../js/components/NavBar';
import {shallow} from 'enzyme';

const mockProps = {
  loggedInUser: 'randomUser',
  chunkNum: 1,
  removeUser: jest.fn(),
  getComments: jest.fn(),
  location: {
    search: 'address bar location',
  },
  txt: {
    logout: 'logout',
  },
};

describe.skip('NavBar Test Suite',() => {
  const wrapper = shallow(<NavBar {...mockProps} />);

  it('should render component successfully', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
  });
});
