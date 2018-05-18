/* global test it expect describe jest*/
import React from 'react';
import {shallow} from 'enzyme';
import Wave from '../../../../../../js/pages/KanbanBoard/components/RecordCommentsComponents/Wave';

const mockProps = {
  onFinishPlaying: jest.fn(),
  txt:
    {noCommentsAvailable: 'noCommentsAvailable'},
  audioFile: 'audio file path',
};

describe('Wave test suite', () => {
  const wrapper = shallow(<Wave {...mockProps} />);
  it('should render the component correctly', () => {
    expect(wrapper.find('Container').length).toBe(1);
    expect(wrapper.find('WaveformContainer').length).toBe(1);
    expect(wrapper.find('Wavesurfer').length).toBe(1);
  });

  test(' test the toggleButton function', ()=> {

    wrapper.instance().toggleButton();
    expect(wrapper.instance().state.play).toEqual(true);
  });

  test(' test the handlePosChange function', ()=> {
    const e = {
      originalArgs: [3, 5],
    };
    wrapper.instance().handlePosChange(e);
    expect(wrapper.instance().state.pos).toEqual(3);
  });

  test(' test the finishedPlaying function', ()=> {
    wrapper.instance().finishedPlaying();
    expect(wrapper.instance().state.play).toEqual(false);
    expect(wrapper.instance().state.pos).toEqual(0);
  });
});
