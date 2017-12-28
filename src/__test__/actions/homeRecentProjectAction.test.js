import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchRecentProjects } from "../../js/actions";
import config from "../../config/config";
import { access } from 'fs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("fetchRecentProjects", () => {
	it('has action type:HOME_RECENT_PROJECTS_RECEIVED and response is not null', () => {
		const expectedActions = [
			{ type: 'HOME_RECENT_PROJECTS_RECEIVED' }
		]
		const store = mockStore({ projects: [] })
		return store.dispatch(fetchRecentProjects()).then(() => {
			let action = store.getActions()[0];
			expect(action.type).toEqual(expectedActions[0].type)
			expect(action.response).not.toBeNull();
		})
	})
	it.skip('has action type:HOME_RECENT_PROJECTS_ERR and response is undefined.', () => {
		const expectedActions = [
			{ type: 'HOME_RECENT_PROJECTS_ERR' }
		]
		const store = mockStore({ projects: [] })
		return store.dispatch(fetchRecentProjects()).then(() => {
			let action = store.getActions()[0];
			expect(action.type).toEqual(expectedActions[0].type);
			expect(action.response).toBeUndefined();
		})
	})
})