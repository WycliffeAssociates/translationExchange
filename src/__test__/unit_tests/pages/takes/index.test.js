/* global describe it test expect jest*/
import React from 'react';
import Index from '../../../../js/pages/takes/TakeCard/index';
import {shallow} from 'enzyme';

const mockProps = {
  count: 1,
  take: {},
  author: 'no author',
  onRatingSet: jest.fn(),
  onMarkedForExportToggled: jest.fn(),
  takeId: 1,
  connectDragPreview: jest.fn(),
  takesToDelete: [1,2],
  owner_icon_hash: 'auserhash',
};

describe.skip('TakeCard test suite', () => {
  const wrapper = shallow(<Index  {...mockProps} />);
  it.skip('renders the LoginPage correctly', () => {
    // expect(wrapper.find('Container').length).toBe(1);
    // expect(wrapper.find('Header').length).toBe(1);
    // expect(wrapper.find('HeaderContainer').length).toBe(1);
    // expect(wrapper.find('CardsContainer').length).toBe(1);

  });

});
