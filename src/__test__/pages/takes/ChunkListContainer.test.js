/* global describe it expect jest */
import React from 'react';
import { shallow } from 'enzyme';
import {ChunkListContainer} from '../../../js/pages/chunks/ChunkListContainer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


describe('ChunkListContainer', () => {
  const mockProps = {
    comments: '',
    takes: '',
    playlistMode: '',
    direction: '',
    displayText: '',
    loaded: '',
    error: '',
    project: '',
    book: '',
    chapter: '',
    language: '',
    selectedSourceProject: '',
    selectedSourceProjectQuery: '',
    active: '',
    notifyFlag: '',
    location: {
      search: '',
    },
    getSelectedProjectInfo: jest.fn(),
  };

  const wrapper = shallow(<ChunkListContainer {...mockProps} />);
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });
});
