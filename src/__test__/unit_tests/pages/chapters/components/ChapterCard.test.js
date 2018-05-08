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
  txt: {
    chapter: 1,
    level: 1,
  },
};
describe('Chapter Card test suite', () => {
  const wrapper = shallow(<ChapterCard {...mockProps} />);

  it('should render Card successfully', () => {
    expect(wrapper.find('Card').length).toEqual(1);
  });

  it('should not display a dangerSign', () => {
    expect(wrapper.find('i').length).toEqual(1); //for the done_all icon
  });

  it('should handle the onClick fucntion', () => {
    wrapper.find('ReviewButton').simulate('click');
    expect(mockProps.history.length).toEqual(1);
  });


});
