/* global describe it test expect jest*/
import React from 'react';
import BottomButtons from '../../../../../../js/pages/takes/TakeCard/Components/BottomButtons';
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
};
describe('LoginPage test suite', () => {
  const wrapper = shallow(<BottomButtons {...mockProps} />);
  it('renders the LoginPage correctly', () => {
    expect(wrapper.find('BottomButtonsContainer').length).toBe(1);
    expect(wrapper.find('PlayTakeContainer').length).toBe(1);
    expect(wrapper.find('CommentButton').length).toBe(1);

  });

  test('convert to minutes function', () => {
    const seconds = wrapper.instance().convertToMinutes(55);
    expect(seconds).toEqual('0:55');
  });

});
