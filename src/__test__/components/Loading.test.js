/* global describe it expect*/
import React from 'react';
import Loading from '../../js/components/Loading';
import {shallow} from 'enzyme';

describe('Loading Component Test Suite', () => {
  const wrapper = shallow(<Loading />);

  it('should render the component successfully', () => {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should have correct text', () => {
    const loadingText = wrapper.find('h1');
    expect(loadingText.text()).toEqual('Loading...');
  });

  it('should have an image', () => {
    expect(wrapper.find('img'));
  });


});
