/* global describe  it expect*/
import React from 'react';
import {shallow} from 'enzyme';
import UserCard from '../../../../js/pages/Login/components/UserCard';

describe('User card suite', function() {
  const wrapper = shallow(<UserCard />);
  it('should render the user card', function() {
    expect(wrapper.find(<div className="UserCard"> </div>));

  });
});
