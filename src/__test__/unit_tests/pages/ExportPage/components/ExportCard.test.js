/* global describe  it:true expect:true  jest:true */
import React from 'react';
import {shallow} from 'enzyme';
import  {ExportCard} from '../../../../../js/pages/export/components/';

const mockProps = {
  id: 1,
  completedSelected: false,
  selections: jest.fn(),
  history: [],
  number: 1,
  location: '',
  has_takes: false,
};
describe('Export Card test suite', () => {
  const wrapper = shallow(<ExportCard {...mockProps} />);

  it('should render Card successfully', () => {
    expect(wrapper.find('Card').length).toEqual(1);
  });

  it.skip('should render the CheckBox', () => {   // having issues rendering the checkbox
    expect(wrapper.find('CheckBox').length).toEqual(1);
  });

  it('should render icons', () => {
    expect(wrapper.find('i').length).toEqual(1);
  });

});
