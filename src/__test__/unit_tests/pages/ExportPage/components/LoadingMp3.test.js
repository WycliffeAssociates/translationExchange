/* global describe  it:true expect:true  jest:true */
import React from 'react';
import {shallow} from 'enzyme';
import  {LoadingMp3} from '../../../../../js/pages/export/components/';

describe('Loading mp3 svg animation', () => {
  const wrapper = shallow(<LoadingMp3 />);

  it('should render mp3 Svg Animation successfully', () => {
    expect(wrapper.find('Container').length).toEqual(1);
  });

});
