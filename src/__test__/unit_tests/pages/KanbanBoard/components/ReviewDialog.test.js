/* global it describe test expect jest*/

import React from 'react';
import {shallow} from 'enzyme';
import ReviewDialog from '../../../../../js/pages/KanbanBoard/components/ReviewDialog';

const mockProps = {

  chapterNum: 1,
  query: 'search?/review?****',
  txt: {
    get: jest.fn()
  },

  closeModal: jest.fn(),
  nextChapter: jest.fn(),
  history: [],

};


describe('Review Dialog test', () => {
  const wrapper = shallow(<ReviewDialog {...mockProps} />);

  it('should render the component w/o exploding', () => {
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('Card').length).toEqual(1);
    expect(wrapper.find('Close').length).toEqual(1);
    expect(wrapper.find('Info').length).toEqual(1);
    expect(wrapper.find('Icon').length).toEqual(1);
    expect(wrapper.find('Message').length).toEqual(1);
    expect(wrapper.find('ExtraInfo').length).toEqual(1);
    expect(wrapper.find('Instructions').length).toEqual(1);
    expect(wrapper.find('Action').length).toEqual(1);
    expect(wrapper.find('ChapterReviewButton').length).toEqual(1);
    expect(wrapper.find('SkipButton').length).toEqual(1);

  });

  test(' ChapterReviewButton onClick' , () => {
    const button = wrapper.find('ChapterReviewButton');
    button.simulate('click');
    expect(mockProps.history.length).toBe(1);
  });

  test('SkipButton onClick', ()=>{
    const button2 = wrapper.find('SkipButton');
    button2.simulate('click');
    expect(mockProps.nextChapter.mock.calls.length).toBe(1);
  });
});
