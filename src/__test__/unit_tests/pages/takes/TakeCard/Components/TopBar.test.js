/* global describe it test expect jest*/
import React from 'react';
import TopBar from '../../../../../../js/pages/takes/TakeCard/Components/TopBar';
import {shallow} from 'enzyme';

const mockProps = {
  owner_icon_hash: 'auserhash',
  date_modified: '2018-04-25T14:11:27.354383Z',
  take_num: 300,
  txt: {
    get: jest.fn()
  },
};
describe('LoginPage test suite', () => {
  const wrapper = shallow(<TopBar {...mockProps} />);
  it('renders the LoginPage correctly', () => {
    expect(wrapper.find('TopBarContainer').length).toBe(1);
    expect(wrapper.find('CardInfo').length).toBe(1);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('DragSource(DragTarget)').length).toBe(1);

  });

  test('test the convertUTC function', () => {
    wrapper.instance().convertUTC(mockProps.date_modified);
    expect(wrapper.instance().state.date).toEqual('25/4/2018');
  });

});
