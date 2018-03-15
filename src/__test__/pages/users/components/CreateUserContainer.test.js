/* global it:true describe:true expect:true*/
require('../../../setup.js');
import React from 'react';
import {shallow} from 'enzyme';
import CreateUserContainer from '../../../../js/pages/user/components/CreateUserContainer';
import mockStore from '../../../mockStore';

const store = mockStore({
});


describe('Create User Container Suite', function() {
  const wrapper = shallow(<CreateUserContainer store={store} />);

  it('should render correctly', function() {
    expect(wrapper.find(<div className="pageBackground" />));

  });

  it('should render Create User card correctly', function() {

  });
});
