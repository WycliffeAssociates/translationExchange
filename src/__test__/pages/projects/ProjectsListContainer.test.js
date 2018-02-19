import React from 'react';
import { shallow } from 'enzyme';
import ProjectsListContainer from '../../../js/pages/projects/ProjectsListContainer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Project List Container', () => {
    const store = mockStore({
        direction: {
            direction: ''
        },
        geolocation: {},
        projectsListContainer: {
            projects: [],
            loaded: false,
            error: "",
            currentProjectQuery: ""
        }
    });
    const wrapper = shallow(<ProjectsListContainer store={store} />);
    it('is rendered', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should have prop projects as array', () => {
        expect(wrapper.props().projects).toEqual(Array());
    });
});
