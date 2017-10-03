import React from 'react';
import { shallow } from 'enzyme';
import ChapterList from '../../../../js/pages/chapters/components/ChapterList';
describe('ChapterList', () => {
    const wrapper = shallow(<ChapterList chapters={[]} path={''} />);
    it('renders', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('is defined', () => {
        expect(wrapper.instance().getContributorText).toBeDefined();
    });

    it('splits array[a,b] as a, b', () => {
        expect(wrapper.instance().getContributorText(['a', 'b'])).toEqual('a, b')
    });
});
