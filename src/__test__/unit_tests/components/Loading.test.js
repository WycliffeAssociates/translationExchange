/* global describe it expect*/
import React from 'react';
import Loading from '../../../js/components/Loading';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

const mockProps =  {
  txt: {
    get: jest.fn()
  },
};
describe('Loading Component Test Suite', () => {
  //test with just jest
  it('renders correctly and matches snapshot', () => {
    const tree = renderer
      .create(<Loading {...mockProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  // test with enzyme
  // const wrapper = shallow(<Loading {...mockProps} />);
  //
  // it('should render the component successfully', () => {
  //   expect(wrapper.find('Container').length).toEqual(1);
  // });
  //
  // it('should have correct text', () => {
  //   const loadingText = wrapper.find('h1');
  //   expect(loadingText.text()).toEqual('Loading...');
  // });
  //
  // it('should have an image', () => {
  //   expect(wrapper.find('img'));
  // });

});
