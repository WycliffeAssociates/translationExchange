/* global describe  it:true expect:true  jest:true */
import React from 'react';
import {shallow} from 'enzyme';
import  BorderButton from '../../../js/components/BorderButton';

const mockProps = {
  txt: 'text',
  icon: 'arrow',
  color: 'blue',
  width: '120px',
  height: '120px',
  iconSize: '20px',
  onClick: jest.fn(),
  fontSize: '20px',
  border: '2px',
  hoverColor: 'blue'
};
describe('Border button Page Suite', () => {

  const wrapper = shallow(<BorderButton {...mockProps} />);

  it('should render Border button successfully', ()=> {
    expect(wrapper.find('BorderButton').length).toEqual(1);
  });


});
