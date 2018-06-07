/* global describe it expect */
import React from 'react';
import DropTarget from '../../../../../../js/pages/projects/components/ImportProject/DropTarget';
import renderer from 'react-test-renderer';

describe('Drop Target test suite', () => {
  it('should render the component without exploding', () =>{
    const tree =
    renderer
      .create(<DropTarget />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
