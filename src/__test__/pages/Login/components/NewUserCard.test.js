/* global describe it expect*/
import React from 'react';
import {shallow} from 'enzyme';
import NewUserCard from '../../../../js/pages/Login/components/NewUserCard';

describe('NewUserCard suite', function() {
  const wrapper = shallow(<NewUserCard />);

  it('should render the compnenet without any error', function() {
    expect(wrapper.find(<div className="NewUserCard"> </div>));
  });
});
