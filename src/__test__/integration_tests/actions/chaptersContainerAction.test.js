
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchChaptersContainerData } from '../../../js/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe.skip('ChaptersContainerAction', () => {
    const store = mockStore();
    xit('has action type:FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS and response is not undefined', () => {
        const expectedActions = [
            { type: 'FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS' }
        ];
        const store = mockStore({ chapters: [] });
        let query = { project_id: 1, lang: 'yo', book: 'gen' };
        return store.dispatch(fetchChaptersContainerData(query)).then(() => {
            let action = store.getActions()[0];
            expect(action.type).toEqual(expectedActions[0].type);
            expect(action.chapters).not.toBeUndefined();
        })
    });
    it('has action type:FETCH_CHAPTERS_CONTAINER_DATA_FAILED and response is not undefined', () => {
        const expectedActions = [
            { type: 'FETCH_CHAPTERS_CONTAINER_DATA_FAILED' }
        ];
        const store = mockStore({ projects: [] });
        return store.dispatch(fetchChaptersContainerData({})).then(() => {
            let action = store.getActions()[0];
            expect(action.type).toEqual(expectedActions[0].type);
            expect(action.response).toBeUndefined();
        })
    })
});
