/* global describe it expect jest*/
import React from 'react';
import ErrorDialog from '../../../js/components/ErrorDialog';
import {shallow} from 'enzyme';

describe('Error Dialog Test Suite', () => {
  const mockProps = { type: 'mic', onClick: jest.fn(), txt: {
    get: jest.fn()
  }};
  const wrapper = shallow(<ErrorDialog {...mockProps} />);

  it('should render the component successfully', () => {
    expect(wrapper.find('Container').length).toEqual(1);
  });

  it('should render a card inside the container', () => {
    expect(wrapper.find('Card').length).toEqual(1);
  });

  it('should call the onClick function', ()=> {

    wrapper.find('Close').simulate('click');
    expect(mockProps.onClick.mock.calls.length).toEqual(1);
  });

  it('should render a mic icon', () => {
    const icon = wrapper.find('i').at(1);
    expect(icon.text()).toEqual('mic_off');
  });
});
