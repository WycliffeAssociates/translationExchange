/* global describe  it:true expect:true  jest:true */
import React from 'react';
import {shallow} from 'enzyme';
import  {ExportCard} from '../../../../../js/pages/export/components/';

const mockProps = {
  id: 1,
  completedSelected: false,
  history: [],
  number: 1,
  location: '',
  txt: {
    chapter: 1,
    level: 1,
  },
};
describe('Export Card test suite', () => {
  const wrapper = shallow(<ExportCard {...mockProps} />);

  it('should render Card successfully', () => {
    expect(wrapper.find('Card').length).toEqual(1);
  });

  it('should render the CheckBox', () => {
    expect(wrapper.find('CheckBox').length).toEqual(1);
  });

  it('should have to material icons', () => {
    expect(wrapper.find('i').length).toEqual(1); //for the icon
  });

  // it('should handle the onClick function', () => {
  //   wrapper.find('BoardButton').simulate('click');
  //   expect(mockProps.history.length).toEqual(1);
  // });


});
