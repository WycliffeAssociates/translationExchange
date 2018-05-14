/* global it expect describe*/
import React from 'react';
import GradientSVG from '../../../../../js/pages/chapters/components/GradientSVG';
import renderer from 'react-test-renderer';

describe('Chapter card comments', () => {
  it('renders correctly and matches snapshot', () => {
    const tree = renderer
      .create(<GradientSVG />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
