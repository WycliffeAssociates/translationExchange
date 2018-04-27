/* global it: true   expect:true  describe:true*/
import React from 'react';
import WelcomeComponent from '../../../../../js/pages/Login/components/WelcomeComponent';
import {shallow} from 'enzyme';

const defaultProps = {
  history: [],
  txt: {
    continue: 'continue',
    gitHubSignIn: 'git sign in',
  },
};

describe('welcome component suite', function() {
  const wrapper = shallow(<WelcomeComponent {...defaultProps} />);

  it('should render without error', function() {
    expect(wrapper.contains('WelcomeDialog'));
  });

  it('should navigate to users', function() {
    const button = wrapper.find('ContinueButton').first();
    button.simulate('click');
    expect(wrapper.instance().props.history.length).toEqual(1);

  });

  it('should find the handleClick function', function() {
    const button = wrapper.find('GitHubLogin');
    button.simulate('click');
    // expect(wrapper.instance().props.history.length).toEqual(2);
  });
});
