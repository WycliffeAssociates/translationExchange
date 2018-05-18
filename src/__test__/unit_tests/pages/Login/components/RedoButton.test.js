/* global it expect describe*/
import React from 'react';
import RedoButton from '../../../../../js/pages/Login/components/RedoButton';
import renderer from 'react-test-renderer';

describe.skip('RedoButton DropTarget', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<RedoButton />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
