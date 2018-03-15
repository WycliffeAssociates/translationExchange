/* global describe it expect jest */
import React from 'react';
import {shallow} from 'enzyme';
import {TakeList} from '../../../../js/pages/takes/TakeList';

const mockProps = {
  takes: [],
  connectDropTarget: jest.fn(),

};
const wrapper = shallow(<TakeList {...mockProps} />);
describe('Test set rating function', () => {

  it('should render the component', function() {
    expect(wrapper.instance());
  });


// const test = wrapper.instance().onDrop();

///console.log(test);

//  expect(true).toEqual(true);

});
