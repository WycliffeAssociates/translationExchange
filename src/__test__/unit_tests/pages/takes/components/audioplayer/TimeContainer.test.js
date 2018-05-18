/* global it expect describe test jest*/
import React from 'react';
import renderer from 'react-test-renderer';
import TimeContainer from '../../../../../../js/pages/takes/components/audioplayer/timeContainer';

describe('TimeContainer test suite', () => {
  const mockProps = {
    markerBtnClicked: jest.fn(),
    updatedTime: 20,
    audioLength: 100,
  };
  it('should render a component that matches the snapshot', () => {
    const tree = renderer
      .create(<TimeContainer {...mockProps} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
