/* global afterEach it describe expect beforeEach jest*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {getTakes, getChunks, patchTake, patchChapter, playTake,
  addTakeToDelete, removeTakeToDelete, updateTake, setProject} from '../../../js/actions';

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
      {type: 'LOADING'},
      { type: 'FETCH_TAKE_SUCCESS', takes: [{activeChunkId: 1, chunkNum: 1, takes: [] }], chunkNum: undefined,
        activeChunkId: undefined},
    ];

    const store = mockStore({ takes: [], chunkNum: '', activeChunkId: ''});
    return store.dispatch(getTakes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it.skip ('get chunks successfully', () => {
    moxios.wait(()=> {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [
      {type: 'LOADING'},
      {type: 'FETCH_CHUNKS_SUCCESS', chunks: {chunks: []},
      },
    ];

    const store = mockStore({chunks: []});
    return store.dispatch(getChunks(1, 1, [])).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('patches take successfully', () => {
    moxios.wait(()=> {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{
          updatedTakes: [],
        }],
      });
    });

    const expectedActions= [
      {type: 'PATCH_TAKE_SUCCESS', updatedTakes: []}];

    const store = mockStore({kanbanPage: {
      takes: [],
      chunks: [],
      chunkNum: 1,
      activeChunkId: 1,
      publishedTakes: [],
      loading: false,
    }});
    return store.dispatch(patchTake(1,{
      published: false, rating: 2},jest.fn(),
    [],1, 2,  false)).then(() => {
      expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify(expectedActions)); // Jest Test “Compared values have no visual difference.” conver to JSON to resolve error

    });
  });

  it('patches chapter successfully', () => {
    moxios.wait(()=> {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions= [
      {type: 'PATCH_CHAPTER_SUCCESS', chapter: {}}];

    const store = mockStore({kanbanPage: {
      chunks: [],
    }});
    return store.dispatch(patchChapter(1,{
      published: false})).then(() => {
      expect(JSON.stringify(store.getActions())).toEqual(JSON.stringify(expectedActions)); // Jest Test “Compared values have no visual difference.” conver to JSON to resolve error
    });
  });

  it('should update the playingTakeId', () => {
    const takeId = 290;
    const expectedAction= {
      type: 'UPDATE_PLAYING_TAKE',
      takeId,
    };

    expect(playTake(takeId)).toEqual(expectedAction);
  });

  it('should addTakeToDelete Queue', () => {
    const takeId= 1;
    const expectedAction = {
      type: 'ADD_TAKE_TO_DELETE',
      takeId,
    };

    expect(addTakeToDelete(takeId)).toEqual(expectedAction);
  });

  it('should addTakeToDelete Queue', () => {
    const takeId= 1;
    const takesToDelete =[1,3];
    const expectedAction = {
      type: 'REMOVE_TAKE_TO_DELETE',
      takesToDelete: [3],
    };

    expect(removeTakeToDelete(takeId,takesToDelete)).toEqual(expectedAction);
  });


  it('should update take after removeTakeToDelete', () => {
    const expectedAction = {
      type: 'UPDATE_TAKE',
    };

    expect(updateTake()).toEqual(expectedAction);
  });

  it('should setProject', () => {
    const expectedAction = {
      type: 'SET_PROJECT',
      slug: 'mat',
    };

    expect(setProject('mat')).toEqual(expectedAction);
  });
});
