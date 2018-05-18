/* global describe it test expect jest*/
import React from 'react';
import TakeCard from '../../../../../../js/pages/takes/TakeCard/Components/TakeCard';
import {shallow} from 'enzyme';

const mockProps = {
  txt: {
    loading: false,
    availableUsers: 'availableUsers',
    languages: 'english',
  },
  takePlaying: false,
  duration: 200,
  comments: [['comment1'], ['comment2']],
  onDeleteQueue: false,
  id: 1,
  playingTakeId: -1,
  playTake: jest.fn(),
  markers: '{"1": 0, "3": 1168141, "2": 537586}',
  isDragging: false,
  location: 'take audio location',
  expandComments: jest.fn(),
};
describe('LoginPage test suite', () => {
  const wrapper = shallow(<TakeCard {...mockProps} />);
  it('renders the TakeCard top half correctly', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('TopBar').length).toBe(1);
    expect(wrapper.find('MarkerContainer').length).toBe(1);
    expect(wrapper.find('WaveformContainer').length).toBe(1);
    expect(wrapper.find('BottomButtons').length).toBe(1);

  });

  test('playTakeFromCard function', () => {
    wrapper.instance().playTakeFromCard();
    expect(mockProps.playTake.mock.calls.length).toEqual(1);
    expect(wrapper.instance().state.takePlaying).toBe(true);
  });
});
