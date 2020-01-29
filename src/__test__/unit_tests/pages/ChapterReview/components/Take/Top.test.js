/* global expect it describe */
import React from 'react';
import renderer from 'react-test-renderer';
import Top from '../../../../../../js/pages/ChapterReview/components/Take/Top';

describe('Take Card Top', () => {
  it('should render the component and not explode', () => {
    const mockProps = {
      txt: {
        get: jest.fn()
      },
      chunkNum: 1,
      takeNum: 4,
    };
    const tree = renderer
      .create(<Top {...mockProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();

  });

});
