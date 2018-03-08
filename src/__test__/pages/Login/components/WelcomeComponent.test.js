/* global it: true   expect:true  describe:true*/
import React from 'react';
import WelcomeComponent from '../../../../js/pages/Login/components/WelcomeComponent';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';

const mockProps = {
  history: [],
};

describe('welcome component suite', function() {
  //const Component = <WelcomeComponent />
  const wrapper = shallow(<WelcomeComponent {...mockProps} />);

  it('should render without error', function() {
    expect(wrapper.contains(<div className="WelcomeDialog"> </div>));
  });

  it('should navigate to users', function() {
    const button = wrapper.find('button').first();
    //console.log(button.handleClick);
    button.simulate('click');
    expect(wrapper.instance().props.history.length).toEqual(1);


  });

  it('should find the handleClick function', function() {
    // expect(wrapper.find('button').to.have.length(2);
  });
});
