/* global describe  it:true expect:true  jest:true */
import React from 'react';
import {shallow} from 'enzyme';
import  {ChapterPage} from '../../../../js/pages/chapters/ChaptersPage';

const mockProps = {
  chapters: ['mock','mock','mock'],
  getChapters: jest.fn(),
  history: [],
  location: {
    search: 'projectId=1&&bookName=1%20John&&mode=Chunk',
  },
  loading: false,
  downloadProject: jest.fn(),
  txt: {
    download: 'download',
  },
};
describe('Chapters Page Suite', () => {

  const wrapper = shallow(<ChapterPage {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('ChapterPageContainer').length).toEqual(1);
  });

  it('should render all children', () => {
    expect(wrapper.find('NavBar').length).toEqual(1);
    expect(wrapper.find('CardsContainer').length).toEqual(1);
    expect(wrapper.find('Loading').length).toEqual(0);
  });

  mockProps.loading = true;
  const loading = shallow(<ChapterPage {...mockProps} />);
  it('should display Loading component', () => {
    expect(loading.find('Loading').length).toEqual(1);
  });

});
