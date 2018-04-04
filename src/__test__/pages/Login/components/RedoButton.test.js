// /* global it:true describe:true expect: true   jest:true*/
// import React from 'react';
// import {shallow} from 'enzyme';
// import RedoButton from '../../../../js/pages/Login/components/RedoButton';
//
// const  defaultProps = {
//   onClick: jest.fn(),
//
// };
//
//
// describe('RedoButton test suite', function() {
//
//   const wrapper = shallow(<RedoButton {...defaultProps} />);
//   it('should render correctly' ,function() {
//     expect(wrapper.find('Button'));
//   });
//
//   it('should call the onClick function', function() {
//     wrapper.simulate('click');
//     expect(defaultProps.onClick.mock.calls.length).toEqual(1);
//   });
//
// });
