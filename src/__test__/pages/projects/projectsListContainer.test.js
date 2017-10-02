import React from 'react';
import { shallow, mount } from 'enzyme';
import ProjectsListContainer from '../../../js/pages/projects/ProjectsListContainer';
import { MemoryRouter as Router } from 'react-router-dom';

describe('ProjectsListContainer', () => {
    const wrapper = shallow(<ProjectsListContainer location={''} />);

    it('renders', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('has initial state', () => {
        const initialProps = {
            loaded: true,
            error: "",
            projects: [],
            currentProjectQuery: ""
        };
        expect(wrapper.instance().state).toEqual(initialProps);
    });
    
    it('is defined', () => {
        expect(wrapper.instance().requestProjects).toBeDefined();
    });
    it('is defined', () => {
        expect(wrapper.instance().setQuery).toBeDefined();
    });
    it('is defined', () => {
        expect(wrapper.instance().clearQuery).toBeDefined();
    });
    it('is defined', () => {
        expect(wrapper.instance().navigateToProject).toBeDefined();
    });
});
