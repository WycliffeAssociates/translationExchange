/* global describe  it:true expect:true  jest:true */
import React from 'react';
import {shallow} from 'enzyme';
import  ChapterCard from '../../../../../js/pages/chapters/components/ChapterCard';

const mockProps = {
  id: 1,
  getChunks: jest.fn(),
  history: [],
  number: 5,
  getComments: jest.fn(),
  location: '',
  total_chunks: 10,
  uploaded_chunks: 10,
  published_chunks: 10,
  txt: { get: jest.fn() },
};
describe('Chapter Card test suite', () => {
  const wrapper = shallow(<ChapterCard {...mockProps} />);

  it('should render Card successfully', () => {
    expect(wrapper.find('Card').length).toEqual(1);
  });

  it('should have to material icons', () => {
    expect(wrapper.find('i').length).toEqual(2); //for the done_all icon
  });

  it('should handle the onClick fucntion', () => {
    wrapper.find('BoardButton').simulate('click');
    expect(mockProps.history.length).toEqual(1);
  });


});
