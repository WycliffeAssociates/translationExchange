/* global describe  it:true expect:true  jest:true */
import React from 'react';
import {shallow} from 'enzyme';
import  {ExportPage} from '../../../../js/pages/export/ExportPage';

const mockProps = {
  chapters: ['mock','mock','mock'],
  getChapters: jest.fn(),
  history: [],
  location: {
    search: 'projectId=1&&bookName=1%20John',
  },
  loading: false,
  txt: {
    get: jest.fn()
  },
};
describe('Export Page Suite', () => {

  const wrapper = shallow(<ExportPage {...mockProps} />);

  it('should render page successfully', ()=> {
    expect(wrapper.find('ExportPageContainer').length).toEqual(1);
  });

  it('should render NavBar', () => {
    expect(wrapper.find('NavBar').length).toEqual(1);
  });

  it('should render all HeaderContainer', () => {
    expect(wrapper.find('HeaderContainer').length).toEqual(1);
  });
  it('should render CardsContainer', () => {

    expect(wrapper.find('CardsContainer').length).toEqual(1);
  });

  mockProps.loading = true;
  const loading = shallow(<ExportPage {...mockProps} />);
  it('should display Loading component', () => {
    expect(loading.find('Loading').length).toEqual(1);
  });

});
