/*global describe it expect jest*/
import React from 'react';
import {shallow} from 'enzyme';
import DownloadLink from '../../../../../js/pages/Download/components/DownloadLink';

describe.skip('Download Link Test Suite', () => { 
  const mockProps = {
    history: [],
    txt: {
      recommended: 'recommended',
    },
    url: '#',
    name: "client.apk"
  };

  const wrapper = shallow(<DownloadLink {...mockProps} />);

  it('should render the component correctly', () => {
    expect(wrapper.find('Container').length).toBe(1);
    expect(wrapper.find('Os').length).toBe(1);
    expect(wrapper.find('FileName').length).toBe(1);
    expect(wrapper.find('DownloadButton').length).toBe(1);
  });

});
