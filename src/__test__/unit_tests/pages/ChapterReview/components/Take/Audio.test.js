/* global expect it describe jest*/
import React from 'react';
import Audio from '../../../../../../js/pages/ChapterReview/components/Take/Audio';
import {shallow} from 'enzyme';
describe('Take Audio Suite', ()=> {
  const mockProps = {
    audio: 'media/dump/1521036382.71365860d0c5aa0-0e3f-47a5-a6b4-5bf9c01f29ff/en_ulb_b63_1jn_c04_v01-03_t03.wav',
    durattion: 12,
    trackPos: jest.fn(),
    pos: 0,
    finishedPlaying: jest.fn(),
    playing: false,
  };
  it('should render the component without exploding', ()=> {
    const wrapper = shallow(<Audio {...mockProps} />);
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('Waveform').length).toEqual(1);
  });

});
