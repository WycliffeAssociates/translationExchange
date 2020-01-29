/* global it describe expect  jest*/
import React from 'react';
import {shallow} from 'enzyme';
import {Download} from '../../../../js/pages/Download/DownloadPage';

const mockProps =  {
  loading: false,
  downloads: [],
  txt: {
    get: jest.fn()
  },
  getDownloads: jest.fn(),
};

describe('Downloads Page test suite', () => {

  const wrapper = shallow(<Download {...mockProps} />);

  it('should render the component correctly', () => {
    expect(wrapper.find('Container').length).toBe(1);
    expect(wrapper.find('BackLink').length).toBe(1);
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('DownloadList').length).toBe(1);
    expect(wrapper.find('NoDownloads').length).toBe(1);
  });

});
