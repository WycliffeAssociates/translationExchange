/* global describe it expect */
import React from 'react';
import ImportProject from '../../../../../../js/pages/projects/components/ImportProject/';
import renderer from 'react-test-renderer';

const mockProps = {
  txt: {
    noProjects: 'There are no available projects',
  },
};
describe('ImportProject test suite', () => {
  it('should render the component without exploding', () =>{
    const tree =
    renderer
      .create(<ImportProject {...mockProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
