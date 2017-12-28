import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAllProjects } from '../../../js/actions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('ProjectsListContainer Action', () => {
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
    it('should have action', () => {
        store.dispatch(fetchAllProjects({language:'aap'}, ""));
        let actions = store.getActions();
        expect(actions[0].type).toBe("ALL_PROJECTS_LOADING");
    });

});
