/* global it: true   expect:true  describe:true*/
import React from 'react';
import TaskProgressPage from '../../../../js/pages/tasks/TaskProgressPage';
import {shallow} from 'enzyme';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

const mockProps = {
  store: store
};

describe.skip('Task Progress Page Test Suite', () => {
  const wrapper = shallow(<TaskProgressPage {...mockProps} />).dive();

  it('should render page successfully', ()=> {
    expect(wrapper.find('TaskProgressPageContainer').length).toEqual(1);
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('NavBar').length).toEqual(1);
    expect(wrapper.find('TaskProgressContainer').length).toEqual(1);
    expect(wrapper.find('TaskProgress').length).toEqual(1);
    expect(wrapper.find('GotoProjectsButton').length).toEqual(1);
  });

});
