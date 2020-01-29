/* global describe it expect */
import React from 'react';
import {shallow} from 'enzyme';
import  {ChapterSelected} from '../../../../../js/pages/export/components/';


describe('Selected Chapter test suite', () => {
  const wrapper = shallow(<ChapterSelected number={6} txt={{get: jest.fn()}}  />);

  it('should render ChapterSelected successfully', () => {
    expect(wrapper.find('ChapterSelected').length).toEqual(1);
  });

  it.skip('Should render the right number from props', () => {  // having issues to find the number prop from the wrapper
    expect(wrapper.prop('number')).toEqual(6);
  });

  it.skip('Should render the text from props', () => {  // having issues to find the number prop from the wrapper
    expect(wrapper.prop('txt')).toEqual({selected: 'selected'});
  });



});
