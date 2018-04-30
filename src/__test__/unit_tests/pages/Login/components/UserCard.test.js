/* global describe  it:true expect:true  test:true */
import React from 'react';
import {shallow} from 'enzyme';
import  UserCard from '../../../../../js/pages/Login/components/UserCard';
import jdenticon from 'jdenticon';
import sinon from 'sinon';


const willMount = sinon.spy();
const didMount = sinon.spy();
const willUnmount = sinon.spy();

const mockProps = {
  id: 0,
  user: {
    recording: '',
    hash: 'FFFFFF',
  },
};

describe.skip('User card suite', function() {
  test('renderer', function() {
    const {wrapper} = shallow(<UserCard {...mockProps} />);
    expect(wrapper.find('')).toBe(true);

  });

  //it('')
});
