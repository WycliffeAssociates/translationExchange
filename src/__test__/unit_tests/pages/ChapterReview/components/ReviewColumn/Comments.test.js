/* global expect it describe jest test*/
import React from 'react';
import Comments from '../../../../../../js/pages/ChapterReview/components/ReviewColumn/Comments';
import {shallow} from 'enzyme';

const mockProps = {
  active: false,
  comments: [
    {id: 1, location: 'location 1'},
    {id: 2, location: 'location 2'}],
  txt: {
    get: jest.fn()
  },
};

describe('Comments suite for ChapterReview', ()=> {
  const wrapper = shallow(<Comments {...mockProps} />);
  it('should render the component w/o blowing up',() => {
    expect(wrapper.find('CommentContainer').length).toBe(1);
    expect(wrapper.find('PlayerTracker').length).toBe(2);
  });

});
