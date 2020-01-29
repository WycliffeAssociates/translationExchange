/* global it describe expect  jest*/
import React from 'react';
import {shallow} from 'enzyme';
import {SettingsPage} from '../../../../js/pages/Settings/SettingsPage';

const mockProps =  {
  txt: {
    get: jest.fn()
  },
  onServerNameChange: jest.fn(),
};

describe('Settings Page test suite', () => {

  const wrapper = shallow(<SettingsPage {...mockProps} />);

  it('should render the component correctly', () => {
    expect(wrapper.find('Container').length).toBe(1);
    expect(wrapper.find('BackLink').length).toBe(1);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('SettingsContainer').length).toBe(1);
    expect(wrapper.find('ButtonsContainer').length).toBe(1);
    expect(wrapper.find('SettingsItem').length).toBeGreaterThan(0);
    expect(wrapper.find('SettingsTitle').length).toBeGreaterThan(0);
    expect(wrapper.find('SettingsValue').length).toBeGreaterThan(0);
    expect(wrapper.find('SettingsInput').length).toBeGreaterThan(0);
  });

});
