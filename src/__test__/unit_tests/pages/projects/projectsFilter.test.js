import React from 'react';
import { shallow } from 'enzyme';
//import ProjectsFilter from '../../../js/pages/projects/ProjectFilter';
import ProjectsFilter from '../../../../js/pages/projects/ProjectFilter';

describe('Projects Filter', () => {
    const wrapper = shallow(<ProjectsFilter />);
    it('renders', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('has initial state', () => {
        const initialState = {
            loaded: false,
            error: "",
            languages: [],
            books: [],
            versions: [],
            projects: []
        };
        expect(wrapper.instance().state).toEqual(initialState);
    });

    it('changes loaded to true', () => {
        wrapper.instance().getFiltersFromProjects([]); //method call
        expect(wrapper.state().loaded).toEqual(true)
    });

    it('has four child elements', () => {
        expect(wrapper.children()).toHaveLength(4);
    });
});
