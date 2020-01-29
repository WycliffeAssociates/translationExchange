/* global test it expect describe jest*/
import React from 'react';
import {shallow} from 'enzyme';
import Comments from '../../../../../../js/pages/KanbanBoard/components/RecordCommentsComponents/Comments';

const mockProps = {
  resetError: jest.fn(),
  txt: { get: jest.fn() },
};

describe('Comments in UtilityPanel', () => {

  const wrapper = shallow(<Comments {...mockProps} />);

  it('should render the component successfully', ()=> {
    expect(wrapper.find('Container').length).toBe(1);
    expect(wrapper.find('TextContainer').length).toBe(1);
    expect(wrapper.find('TextHeader').length).toBe(1);
    expect(wrapper.find('AudioContainer').length).toBe(1);
    expect(wrapper.find('ButtonContainer').length).toBe(1);
    expect(wrapper.find('RecordCommentsModal').length).toBe(1);
  });

  test('closeModal function', () => {
    wrapper.instance().closeModal();

    expect(wrapper.instance().state.displayModal).toEqual(false);
    expect(mockProps.resetError.mock.calls.length).toEqual(1);

  });
});
