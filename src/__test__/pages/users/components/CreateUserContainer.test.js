/* global it:true describe:true expect:true */
import React from 'react';
import {shallow} from 'enzyme';
//import {Card} from 'semantic-ui-react';
import CreateUserContainer from '../../../../js/pages/user/components/CreateUserContainer';

describe('Create User Container Suite', function() {
  const wrapper = shallow(<CreateUserContainer />);

  it('should render correctly', function() {
    expect(wrapper.find(<div className="background" />));

  });

  it('should render Create User card correctly', function() {

  });
});
