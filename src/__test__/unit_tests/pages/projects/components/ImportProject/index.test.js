/* global describe it expect */
import React from 'react';
import ImportProject from '../../../../../../js/pages/projects/components/ImportProject/';
import renderer from 'react-test-renderer';

describe('ImportProject test suite', () => {
  it('should render the component without exploding', () =>{
    const tree =
    renderer
      .create(<ImportProject />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
