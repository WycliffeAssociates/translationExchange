/* global it: true   expect:true  describe:true*/
import React from 'react';
import TaskItemFinished from '../../../../../js/pages/tasks/components/TaskItemFinished';
import {shallow} from 'enzyme';

const mockProps = {
  task: {
    'status': null,
    'progress': 100,
    details: {
      book_slug: 'mat',
    },
  },
};

describe('Task Item Finished Test Suite', () => {
  const wrapper = shallow(<TaskItemFinished {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('TaskDetails').length).toEqual(1);
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('Picture').length).toEqual(1);
    expect(wrapper.find('Img').length).toEqual(1);
    expect(wrapper.find('Flag').length).toEqual(1);
    expect(wrapper.find('RightColumn').length).toEqual(1);
    expect(wrapper.find('TaskInfoLeft').length).toEqual(1);
  });

});
