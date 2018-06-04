/* global describe it test expect jest*/
import React from 'react';
import RecentProjectsContainer from '../../../../js/pages/projects/RecentProjectsContainer';
import {shallow} from 'enzyme';

describe('LoginPage test suite', () => {
  const wrapper = shallow(<RecentProjectsContainer  />);
  it('renders the LoginPage correctly', () => {
    expect(wrapper.find('Container').length).toBe(1);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('HeaderContainer').length).toBe(1);
    expect(wrapper.find('CardsContainer').length).toBe(1);

  });

});
