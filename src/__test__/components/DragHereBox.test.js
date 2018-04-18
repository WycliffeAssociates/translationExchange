/* global describe it expect*/
import React from 'react';
import DragHereBox from '../../js/components/DragHereBox';
import {shallow} from 'enzyme';

describe('DragHereBox suite', () => {
  const wrapper = shallow(<DragHereBox />);
  it('should render component successfully', () => {
    expect(wrapper.find('DragBoxContainer').length).toEqual(1);
  });

});
