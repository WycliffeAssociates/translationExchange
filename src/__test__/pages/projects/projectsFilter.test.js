import React from 'react';
import { shallow, mount } from 'enzyme';
import ProjectsFilter from '../../../js/pages/projects/ProjectFilter';

describe('ProjectsList', () => {
    const wrapper = shallow(<ProjectsFilter />);
    const intialState = {
        loaded: false,
        error: "",
        languages: [],
        books: [],
        versions: [],
        projects: []
    };

    it('is rendered', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('has initial state', () => {
        expect(wrapper.instance().state).toEqual(intialState);
    });

    it('has 4 children', () => {
        const wrapper = mount(<ProjectsFilter />);
        expect(wrapper.children()).toHaveLength(4);
    });

    it('changes state, {loaded:true}', () => {
        const projects = [];
        wrapper.instance().getFiltersFromProjects(projects);
        expect(wrapper.instance().state).not.toEqual(intialState);
    });
    
    it('has property,click', () => {
        expect(wrapper.find('Button').simulate('click')).toHaveLength(1);
    });
    it('has property,click', () => {
        expect(wrapper.find('Button').simulate('click')).toHaveLength(1);
    });
});
