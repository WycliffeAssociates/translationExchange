/* global describe  it:true expect:true  jest:true */
import React from 'react';
import {shallow} from 'enzyme';
import  {LoadingWav} from '../../../../../js/pages/export/components/';

describe('Loading wav svg animation', () => {
  const wrapper = shallow(<LoadingWav />);

  it('should render wav Svg Animation successfully', () => {
    expect(wrapper.find('Container').length).toEqual(1);
  });

});
