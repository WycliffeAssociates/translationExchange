/* global test it expect describe jest*/
import React from 'react';
import {shallow} from 'enzyme';
import Comments from '../../../../../../js/pages/KanbanBoard/components/RecordCommentsComponents/Comments';

const mockProps = {
  resetError: jest.fn(),
  txt:
    {noCommentsAvailable: 'noCommentsAvailable'},
};

describe('Comments in UtilityPanel', () => {

  const wrapper = shallow(<Comments {...mockProps} />);

  it('should render the component successfully', ()=> {

    expect(wrapper.find('Container'));
    expect(wrapper.find('TextContainer'));
    expect(wrapper.find('TextHeader'));
    expect(wrapper.find('AudioContainer'));
    expect(wrapper.find('ButtonContainer'));
    expect(wrapper.find('RecordCommentsModal'));
  });

  test('closeModal function', () => {
    wrapper.instance().closeModal();

    expect(wrapper.instance().state.displayModal).toEqual(false);
    expect(mockProps.resetError.mock.calls.length).toEqual(1);

  });
});
