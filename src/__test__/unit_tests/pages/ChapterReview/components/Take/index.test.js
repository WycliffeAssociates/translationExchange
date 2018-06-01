/* global expect it describe jest test*/
import React from 'react';
import Take from '../../../../../../js/pages/ChapterReview/components/Take/index';
import {shallow} from 'enzyme';

const mockProps= {
  updateActiveChunkIndex: jest.fn(),
  take: {
    publishedTake: {
      take_num: 1,
      location: 'media/dump/xxxxxxx',
      duration: 11,
      markers: '{"1": 0, "3": 829911, "2": 472501}',
    },
    chunkNum: 1,

  },
  activeChunkIndex: 3, active: false, resetPos: jest.fn(),
  resetTake: jest.fn(), selectedTakesLength: 10,
  txt: 'txt',
};

describe('Take card index', ()=> {
  const wrapper = shallow(<Take {...mockProps} />);

  it('should render the components w/o exploding', ()=> {
    expect(wrapper.find('Container').length).toEqual(1);
    expect(wrapper.find('Top').length).toEqual(1);
    expect(wrapper.find('Audio').length).toEqual(1);
    expect(wrapper.find('VerseMarkers').length).toEqual(1);
  });

  test('trackPos function', ()=> {
    wrapper.instance().trackPos(3);
    expect(wrapper.instance().state.pos).toEqual(3);
  });

  test('dragPosition function', ()=> {
    wrapper.instance().dragPosition(22000);
    expect(wrapper.instance().state.pos).toEqual(22000);
  });

  test('finishedPlaying function', ()=> {
    wrapper.instance().finishedPlaying();
    expect(mockProps.updateActiveChunkIndex.mock.calls.length).toEqual(1);
    mockProps.activeChunkIndex = 9;
    wrapper.instance().finishedPlaying();
    expect(mockProps.updateActiveChunkIndex.mock.calls.length).toEqual(2);

  });
  
  test('componentWillReceiveProps' , () => {
    wrapper.instance().componentWillReceiveProps({resetPos: true});
    expect(wrapper.instance().state.pos).toBe(0);
    expect(mockProps.resetTake.mock.calls.length).toEqual(1);
  });


});
