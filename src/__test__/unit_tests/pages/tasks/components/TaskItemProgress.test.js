/* global it: true   expect:true  describe:true*/
import React from 'react';
import TaskItemProgress from '../../../../../js/pages/tasks/components/TaskItemProgress';
import {shallow} from 'enzyme';

const mockProps = {
  task: {
    'status': null,
    'progress': 50,
    details: {
      book_slug: 'mat',
    },
  },
};

describe('Task Item Progress Test Suite', () => {
  const wrapper = shallow(<TaskItemProgress {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('TaskDetails').length).toEqual(1);
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('Picture').length).toEqual(1);
    expect(wrapper.find('Img').length).toEqual(1);
    expect(wrapper.find('RightColumn').length).toEqual(1);
    expect(wrapper.find('TaskInfoTop').length).toEqual(1);
    expect(wrapper.find('TaskProgressBar').length).toEqual(1);
  });

});
