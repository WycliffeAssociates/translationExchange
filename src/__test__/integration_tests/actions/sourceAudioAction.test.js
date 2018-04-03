import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
//import { fetchAllSourceAudio } from '../../js/actions';
import { fetchAllSourceAudio } from '../../../js/actions';
import config from '../../config/config'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Source Audio Action', () => {
    const store = mockStore({ projects: [] })
    it('has action type:SOURCE_AUDIO_LOADING and response is not defined', () => {
		const expectedActions = [
            { type: 'SOURCE_AUDIO_LOADING' },
		]
		return store.dispatch(fetchAllSourceAudio(1,'yo',()=>{})).then(() => {
			let action = store.getActions()[0];
			expect(action.type).toEqual(expectedActions[0].type)
            expect(action.response).toBeUndefined();
		})
	})
    it.skip('has action type:SOURCE_AUDIO_SUCCESS and response not null', () => {
		const expectedActions = [
            { type: 'SOURCE_AUDIO_SUCCESS' },
		]
		return store.dispatch(fetchAllSourceAudio(1,'yo',()=>{})).then(() => {
			let action = store.getActions()[1];
			expect(action.type).toEqual(expectedActions[0].type);
            expect(action.response).not.toBeNull();
		})
	})
    it.skip('has action type:SOURCE_AUDIO_FAILED and response is undefined', () => {
		const expectedActions = [
            { type: 'SOURCE_AUDIO_FAILED' },
		]
		return store.dispatch(fetchAllSourceAudio(2,'yoo',()=>{})).then(() => {
			let action = store.getActions()[1];
			expect(action.type).toEqual(expectedActions[0].type);
           		expect(action.response).toBeUndefined();
		})
	})
});
