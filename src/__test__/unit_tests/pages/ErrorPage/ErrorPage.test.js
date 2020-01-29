/* global describe it expect jest*/
import React from 'react';
import {ErrorPage} from '../../../../js/pages/ErrorPage/ErrorPage';
import {shallow} from 'enzyme';

const mockProps = {
  history: [],
  txt: {
    get: jest.fn()
  },
};

describe('Error Page Test Suite', () => {
  const wrapper = shallow(<ErrorPage {...mockProps} />);
  it('should display without blowing up', () => {
    expect(wrapper.find('ErrorPageContainer').length).toEqual(1);
  });

  it('should displaly Image correctly', () => {
    expect(wrapper.find('ImageContainer').length).toEqual(1);
    expect(wrapper.find('Image').length).toEqual(1);
  });

  it('should redirect to welcome page', ()=> {
    wrapper.instance().redirect();
    expect(mockProps.history[0]).toEqual('/welcome');
  });
});
