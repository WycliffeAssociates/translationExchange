/* global it: true   expect:true  describe:true*/
import React from 'react';
import ProgressBar from '../../../../../js/components/ProgressBar';
import {shallow} from 'enzyme';

const mockProps = {
  progress: 50,
};

describe('ProgressBar Test Suite', () => {
  const wrapper = shallow(<ProgressBar {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('ProgressContainer').length).toEqual(1);
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('Progress').length).toEqual(1);
    expect(wrapper.find('Result').length).toEqual(1);
  });

});
