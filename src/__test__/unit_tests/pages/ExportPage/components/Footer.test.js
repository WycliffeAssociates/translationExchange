/* global describe  it:true expect:true  jest:true */
import React from 'react';
import {shallow} from 'enzyme';
import  {Footer} from '../../../../../js/pages/export/components/';

const mockProps = {
  nextStep: jest.fn(),
  txt: { get: jest.fn() },
};
describe('Footer test suite', () => {
  const wrapper = shallow(<Footer {...mockProps} />);

  it('should render Footer successfully', () => {
    expect(wrapper.find('Footer').length).toEqual(1);
  });

  it('should render the Next button', () => {
    expect(wrapper.find('Button').length).toEqual(1);
  });



});
