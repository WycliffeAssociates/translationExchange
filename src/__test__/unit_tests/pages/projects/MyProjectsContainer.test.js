/* global describe it expect jest*/
import React from 'react';
import MyProjectsContainer from '../../../../js/pages/projects/MyProjectsContainer';
import {shallow} from 'enzyme';

const mockProps = {
  txt: {
    get: jest.fn()
  },
  projects: [
    {id: 1,
      book: {
        name: 'James',
      },
      language: {
        name: 'English',
      },
      version: {
        slug: 'ulb',
      },
      date_modified: '2018/05/17',
      mode: {
        name: 'chunk',
      },
      slug: 'mat',
    },

    {id: 2,
      book: {
        name: 'Jude',
      },
      language: {
        name: 'English',
      },
      version: {
        slug: 'ulb',
      },
      date_modified: '2018/05/17',
      mode: {
        name: 'verse',
      },
      slug: 'luk',
    },
  ],
  updateLanguage: jest.fn(),
};
describe('MyProjectsContainer test suite', () => {
  const wrapper = shallow(<MyProjectsContainer {...mockProps} />);
  it('renders the MyProjectsContainer correctly', () => {
    expect(wrapper.find('Container').length).toBe(1);
    expect(wrapper.find('HeaderContainer').length).toBe(1);
    expect(wrapper.find('CardsContainer').length).toBe(1);

  });

});
