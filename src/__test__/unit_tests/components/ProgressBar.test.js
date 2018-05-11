/* global describe it expect*/
import React from 'react';
import ProgressBar from '../../../js/components/ProgressBar';
import {shallow} from 'enzyme';

const mockProps = {
  label: 'label',
  resultColor: 'blue',
  result: 'result',
};

describe('Progress Bar test suite', () => {
  const wrapper = shallow(<ProgressBar {...mockProps} />);

  it('should render the component successfully', () => {
    expect(wrapper.find('ProgressContainer').length).toEqual(1);
  });

  it('should display correct result', () => {
    const Result = wrapper.find('Result').dive();
    expect(Result.text()).toEqual('result');
  });

  it('should display correct progress label', () => {
    const Progress = wrapper.find('Progress').dive();
    expect(Progress.text()).toEqual('label');
  });

});
