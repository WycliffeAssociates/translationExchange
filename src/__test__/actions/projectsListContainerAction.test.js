import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAllProjects } from '../../js/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('ProjectsListContainer Action', () => {
    const store = mockStore({});
    it('has action type:ALL_PROJECTS_LOADING and ALL_PROJECTS_SUCCESS ', () => {
        let query={ language: 'yo' }
        store.dispatch(fetchAllProjects(query));
        let actions = store.getActions();
        expect(actions[0].type).toBe("ALL_PROJECTS_LOADING");
    });
});
