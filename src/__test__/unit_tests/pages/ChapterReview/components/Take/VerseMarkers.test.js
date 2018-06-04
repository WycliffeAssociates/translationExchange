/* global expect it describe jest test*/
import React from 'react';
import {shallow} from 'enzyme';
import VerseMarkers from '../../../../../../js/pages/ChapterReview/components/Take/VerseMarkers';

const mockProps = {
  markers: '{"1": 0, "3": 829911, "2": 472501}',
  active: false,
  dragPosition: jest.fn(),
};

describe('Verse Markers', ()=> {
  const wrapper = shallow(<VerseMarkers {...mockProps} />);

  it('should render the markers' ,() => {
    expect(wrapper.find('Marker').length).toEqual(3);
  });

  test('onClick function', ()=> {
    const marker = wrapper.find('Marker').last();
    marker.simulate('click');
    expect(mockProps.dragPosition.mock.calls.length).toBe(1);
  });
});
