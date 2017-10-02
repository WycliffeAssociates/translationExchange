import React from 'react';
import {shallow} from 'enzyme';
import ProjectsList from '../../../../js/pages/projects/components/ProjectsList';

describe('ProjectsList', () => {
    const wrapper=shallow(<ProjectsList projects={[]}/>);
    it('is rendered', () => {
       expect(wrapper.children).toHaveLength(1);
    });
    
    it('has two children under Table', () => {
        expect(wrapper.find('Table').children()).toHaveLength(2);
    });

    
    it('returns contributors', () => {
        const expectedValue=['a','b'];
        expect(wrapper.instance().getContributorText(expectedValue)).toEqual(expectedValue.join(', '));
    });
    
});
