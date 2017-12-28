import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchAllSourceAudio } from '../../../js/actions';
import config from '../../../config/config'
import moxios from 'moxios';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Source Audio Action', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should mock ", () => {
        let data=[
            {
                "id": 1,
                "completed": 2,
                "date_modified": "2017-12-21T15:08:52.886036Z",
                "published": false,
                "version": {
                    "id": 1,
                    "slug": "ulb",
                    "name": "universal literal bible"
                },
                "mode": {
                    "id": 1,
                    "slug": "chunk",
                    "name": "chunk",
                    "unit": 0
                },
                "anthology": {
                    "id": 1,
                    "slug": "ot",
                    "name": "old testament"
                },
                "language": {
                    "id": 1,
                    "slug": "yo",
                    "name": "yolo"
                },
                "source_language": {
                    "id": 1,
                    "slug": "yo",
                    "name": "yolo"
                },
                "book": {
                    "id": 1,
                    "slug": "gen",
                    "name": "Genesis",
                    "number": 1,
                    "anthology": 1
                }
            }
        ];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: data
            });
        });
        const store = mockStore({ projects: [] })
        const expectedActions = [
            { type: 'SOURCE_AUDIO_LOADING' },
            { type: 'SOURCE_AUDIO_SUCCESS', projects: data }
        ]
        return store.dispatch(fetchAllSourceAudio()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
