/* global describe it test expect jest*/
import React from 'react';
import {Welcome} from '../../../../js/pages/Login/LoginPage';
import {shallow} from 'enzyme';

const mockProps = {
  history: [],
  txt: {
    get: jest.fn()
  },
  users: [{is_social: false, id: 1}, {is_social: true, id: 2}],
  updateLanguage: jest.fn(),
  fetchLocalization: jest.fn()
};
describe('LoginPage test suite', () => {
  const wrapper = shallow(<Welcome {...mockProps} />);
  it('renders the LoginPage correctly', () => {
    expect(wrapper.find('LoginPage').length).toBe(1);
    expect(wrapper.find('Language').length).toBe(1);
    expect(wrapper.find('LanguageContainer').length).toBe(1);
    expect(wrapper.find('SettingsButton').length).toBe(1);
  });

  test('on Select function', () => {
    wrapper.instance().onSelect('language');
    expect(mockProps.updateLanguage.mock.calls.length).toEqual(1);
  });

  it('should navigate to settings', () => {
    wrapper.instance().onSettingsClick();
    expect(wrapper.instance().props.history.length).toEqual(1);
  });
});
