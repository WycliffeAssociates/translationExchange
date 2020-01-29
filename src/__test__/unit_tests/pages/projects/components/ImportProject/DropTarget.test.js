/* global describe it expect */
import React from 'react';
import DropTarget from '../../../../../../js/pages/projects/components/ImportProject/DropTarget';
import renderer from 'react-test-renderer';

const mockProps = {
  txt: {
    get: jest.fn()
  },
};
describe('Drop Target test suite', () => {
  it('should render the component without exploding', () =>{
    const tree =
    renderer
      .create(<DropTarget {...mockProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
