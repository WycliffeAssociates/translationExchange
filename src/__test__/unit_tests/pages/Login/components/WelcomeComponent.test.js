/* global it: true   expect:true  describe:true*/
import React from 'react';
import WelcomeComponent from '../../../../../js/pages/Login/components/WelcomeComponent';
import {shallow} from 'enzyme';

const defaultProps = {
  history: [],
  txt: {
    get: jest.fn()
  },
};

describe('welcome component suite', function() {
  const wrapper = shallow(<WelcomeComponent {...defaultProps} />);

  it('should render without error', function() {
    expect(wrapper.contains('WelcomeDialog'));
  });

  it('should render all children successfully', ()=> {
    expect(wrapper.find('Icon').length).toEqual(1);
    expect(wrapper.find('ContinueButton').length).toEqual(0); // ContinueButton renders only in "Client" app
    expect(wrapper.find('DownloadButton').length).toEqual(1);
    expect(wrapper.find('ContinueLink').length).toEqual(1);
  });

  it('should navigate to users', function() {
    const button = wrapper.find('ContinueLink').first();
    button.simulate('click');
    expect(wrapper.instance().props.history.length).toEqual(1);

  });

  it.skip('should find the handleClick function', function() {
    const button = wrapper.find('GitHubLogin');
    button.simulate('click');
    // expect(wrapper.instance().props.history.length).toEqual(2);
  });
});
