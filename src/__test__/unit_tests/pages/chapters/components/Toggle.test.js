/* global it expect describe*/
import React from 'react';
import Toggle from '../../../../../js/pages/chapters/components/Toggler';
import renderer from 'react-test-renderer';

describe('Chapter card comments', () => {
  it('renders correctly and matches snapshot', () => {
    const tree = renderer
      .create(<Toggle />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
