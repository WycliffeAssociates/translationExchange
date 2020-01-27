/* global describe it expect jest test*/
import React from 'react';
import {shallow} from 'enzyme';
import AddFile from '../../../../../../js/pages/projects/components/ImportProject/AddFile';

const mockProps = {
  history: [],
  importProject: jest.fn(),
  txt: {
    get: jest.fn()
  },
};

describe('Add File test suite', () => {
  const wrapper = shallow(<AddFile {...mockProps} />);

  it('should render the component without exploding', () => {
    expect(wrapper.find('Form').length).toEqual(1);
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('Submit').length).toEqual(1);
    expect(wrapper.find('Input').length).toEqual(1);
  });

  it('should call the handleSubmit function' ,() => {
    wrapper.find('Form').simulate('submit', {
      fileInput: {
        files: [
          'file1', 'file2',
        ],
      },
      preventDefault: jest.fn(),
    });
    expect(mockProps.history.length).toEqual(1);
    /* this.fileInput is not defined therefore importProject can't be called ...*/
    expect(mockProps.importProject.mock.calls.length).toEqual(0);

  });

  test('input event listener', ()=> {
    wrapper.find('Input').first().simulate('click', {
      target: {
        value: 'file:\\randomfile.zip',
      },
      preventDefault: jest.fn(),
    });
    wrapper.find('Input').first().simulate('click', {
      target: {
        value: '',
      },
      preventDefault: jest.fn(),
    });
  });
});
