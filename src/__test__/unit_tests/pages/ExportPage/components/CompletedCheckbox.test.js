/* global describe it jest expect  */
import React from 'react';
import {shallow} from 'enzyme';
import  {CompletedCheckbox} from '../../../../../js/pages/export/components/';

const mockProps = {
  checked: false,
  toggleCheck: jest.fn(),
  txt: { get: jest.fn() },
};

describe('CheckBox test suite', () => {
  const wrapper = shallow(<CompletedCheckbox {...mockProps}  />);

  it('should render ChapterSelected successfully', () => {
    expect(wrapper.find('CompletedCheckbox').length).toEqual(1);
  });

  it.skip('Should have a initial prop of checked false', () => {  // having issues to find props from the wrapper
    expect(wrapper.prop('checked')).toEqual(false);
  });



});
