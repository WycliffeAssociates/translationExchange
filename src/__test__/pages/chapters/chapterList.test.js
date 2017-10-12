import React from 'react';
import { shallow } from 'enzyme';
import ChapterList from '../../../js/pages/chapters/components/ChapterList';

describe('ChapterList', () => {
    const wrapper = shallow(<ChapterList chapters={[]} path={""}/>);
    it('should render...', () => {
        expect(wrapper).toHaveLength(1);
    });
    
    it('should return space between contributors', () => {
       expect(wrapper.instance().getContributorText(['juan','nick'])).toEqual('juan, nick');
    });    
});
