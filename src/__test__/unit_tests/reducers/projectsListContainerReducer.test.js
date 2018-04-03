//import ProjectsListContainerReducer from '../../js/reducers/ProjectsListContinerReducer';
import ProjectsListContainerReducer from '../../../js/reducers/ProjectsListContinerReducer';

describe('ProjectsListContainerReducer', () => {
    const INITIAL_STATE = {
        loaded: true,
        error: "",
        projects: [],
        currentProjectQuery: ""
    };

    it('should have initial State', () => {
        expect(ProjectsListContainerReducer(undefined, {})).toEqual(INITIAL_STATE);
    });
    it('should change the initial state', () => {
        expect(ProjectsListContainerReducer({}, {
            type: "ALL_PROJECTS_LOADING"
        })).not.toEqual(INITIAL_STATE);
    });
    it('should change the initial state', () => {
        expect(ProjectsListContainerReducer({}, {
            type: "ALL_PROJECTS_SUCCESS"
        })).not.toEqual(INITIAL_STATE);
    });

});
