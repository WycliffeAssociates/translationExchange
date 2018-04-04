/* global afterEach it describe expect beforeEach */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {getTakes, getChunks} from '../../js/actions';

const middlewares = [thunk];
const mockStore  = configureMockStore(middlewares);
describe('KanbanPageActions Suite', () => {

  beforeEach(() => {
    moxios.install();
  });
  afterEach(()=> {
    moxios.uninstall();
  });

  it('gets Takes Successfully', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{takes: [], chunkNum: 1,
          activeChunkId: 1}],
      });
    });

    const expectedActions = [
      { type: 'FETCH_TAKE_SUCCESS', takes: [{activeChunkId: 1, chunkNum: 1, takes: [] }], chunkNum: undefined,
        activeChunkId: undefined},
    ];

    const store = mockStore({ takes: [], chunkNum: '', activeChunkId: ''});
    return store.dispatch(getTakes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it ('get chunks successfully', () => {
    moxios.wait(()=> {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {chunks: []},
      });
    });

    const expectedActions = [
      {type: 'FETCH_CHUNKS_SUCCESS', chunks: {chunks: []},
      },
    ];

    const store = mockStore({chunks: []});
    return store.dispatch(getChunks()).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
