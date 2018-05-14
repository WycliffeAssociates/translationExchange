/* global it expect describe*/
import React from 'react';
import {shallow} from 'enzyme';
import Comments from '../../../../../js/pages/chapters/components/Comments';
import renderer from 'react-test-renderer';


const mockProps = {
  comments: [{
    id: 1,
    content_type: 9,
    date_modified: 'today',
    object_id: 75,
    owner: 1,
    owner_icon_hash: 'aRandomHash',
    owner_name_audio: 'owner audio',
    location: 'mulberry avenue',
  }],
};
describe.skip('Chapter card comments', () => {
  const wrapper = shallow(<Comments {...mockProps} />);
  it('renders correctly and does not blow up', () => {
    expect(wrapper.find('Container'));
  });

});
