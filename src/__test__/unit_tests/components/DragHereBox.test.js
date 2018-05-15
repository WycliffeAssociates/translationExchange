/* global describe it expect*/
import React from 'react';
import DragHereBox from '../../../js/components/DragHereBox';
import {shallow} from 'enzyme';

const props = {
  txt: {
    dragHere: 'drag Here',
  },
};
describe('DragHereBox suite', () => {
  const wrapper = shallow(<DragHereBox {...props} />);
  it('should render component successfully', () => {
    expect(wrapper.find('DragBoxContainer').length).toEqual(1);
  });

});
