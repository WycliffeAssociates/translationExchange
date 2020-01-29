/* global describe it jest expect  */
import React from 'react';
import {shallow} from 'enzyme';
import  {Downloading} from '../../../../../js/pages/export/components/';


const mockProps = {
  checked: false,
  toggleCheck: jest.fn(),
  downloading: true,
  getDownloadProgress: jest.fn(),
  txt: { get: jest.fn() },
};

describe('Downloading test suite', () => {
  const wrapper = shallow(<Downloading {...mockProps}  />);

  it('should render Downloading component successfully', () => {
    expect(wrapper.find('Downloading').length).toEqual(2);
  });

});
