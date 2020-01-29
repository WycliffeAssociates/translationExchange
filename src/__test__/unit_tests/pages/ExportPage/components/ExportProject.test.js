/* global describe it jest expect  */
import React from 'react';
import {shallow} from 'enzyme';
import  {ExportProject} from '../../../../../js/pages/export/components/';


const mockProps = {
  taskId: 123,
  resetSelected: jest.fn(),
  downloading: jest.fn(),
  getDownloadProgress: jest.fn(),
  txt: { get: jest.fn() },
};

describe('ExportProject test suite', () => {
  const wrapper = shallow(<ExportProject {...mockProps}  />);

  it('should render ExportProject component successfully', () => {
    expect(wrapper.find('ExportProjectContainer').length).toEqual(1);
  });

  it('should render the options to download mp3 or wav files', () => {
    expect(wrapper.find('OptionsContainer').length).toEqual(1);
  });

});
