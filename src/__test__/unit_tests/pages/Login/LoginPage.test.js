/* global describe it test expect jest*/
import React from 'react';
import {Welcome} from '../../../../js/pages/Login/LoginPage';
import {shallow} from 'enzyme';

const mockProps = {
  txt: {
    loading: false,
    availableUsers: 'availableUsers',
    languages: 'english',
  },
  users: [{is_social: false, id: 1}, {is_social: true, id: 2}],
  updateLanguage: jest.fn(),
};
describe('LoginPage test suite', () => {
  const wrapper = shallow(<Welcome {...mockProps} />);
  it('renders the LoginPage correctly', () => {
    expect(wrapper.find('LoginPage').length).toBe(1);
    expect(wrapper.find('Language').length).toBe(1);
    expect(wrapper.find('LanguageContainer').length).toBe(1);

  });

  test('on Select function', () => {
    wrapper.instance().onSelect('language');
    expect(mockProps.updateLanguage.mock.calls.length).toEqual(1);

  });
});
