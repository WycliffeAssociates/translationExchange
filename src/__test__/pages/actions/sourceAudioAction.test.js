import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchAllSourceAudio } from '../../../js/actions/SourceAudioAction';
import nock from 'nock'
import config from '../../../config/config'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('Source Audio Action', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should fetch source audio', () => {
        nock(config.apiUrl).post("all_projects/",
            { is_publish: true, book: "mrk" })
            .reply(200, { body: { projects: [1, 2, 3, 4, 5] } });
    });
    const actions = [
        { type: 'SOURCE_AUDIO_LOADING' },
        { type: 'SOURCE_AUDIO_SUCCESS', body: { projects: [1, 2, 3, 4, 5] } }
    ]
    const store = mockStore({ products: [] })
    return store.dispatch(fetchAllSourceAudio("mrk",14)).then(()=>{
        expect(store.getActions()).toEqual(actions);
    })
});
