/*global describe it expect jest*/
import React from 'react';
import {shallow} from 'enzyme';
import DownloadButton from '../../../../../js/pages/Download/components/DownloadButton';

describe.skip('Download Button Test Suite', () => { 
  const mockProps = {
    history: [],
    txt: {
      download: 'download',
    },
    url: '#',
  };

  const wrapper = shallow(<DownloadButton {...mockProps} />);

  it('should render the component correctly', () => {
    expect(wrapper.find('Container').length).toBe(1);
  });

});
