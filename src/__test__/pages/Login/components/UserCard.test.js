/* global describe  it expect*/
import React from 'react';
import {shallow} from 'enzyme';
import UserCard from '../../../../js/pages/Login/components/UserCard';
import jdenticon from 'jdenticon';
import sinon from 'sinon';

const willMount = sinon.spy();
const didMount = sinon.spy();
const willUnmount = sinon.spy();

const defaultProps = {
  id: 0,
  user: {
    recording: '',
    hash: 'FFFFFF',
  },
};

describe('User card suite', function() {
  //const wrapper = shallow(<UserCard />);
  // it('should render the user card', function() {
  //   expect(wrapper.find('UserCardContainer'));
  // });

  //it('')
});
