/* global describe  expect  beforeEach afterEach test*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getAlternateTakes, getSelectedTakes,setTake,
  swapTake, undoSwapTake, togglePlay, updateActiveChunkIndex, clearAlternateTakes} from '../../../js/actions';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ChapterReview Actions', ()=> {
  beforeEach(()=> {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test.skip('getAlternateTakes function', ()=> {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response:
          [{takes: [{id: 1, location: 'xxx', rating: 3, published: false}]}],

      });
    });
    const expectedActions = [
      {type: 'FETCH_ALTERNATE_TAKES',
        alternateTakes: [{chunkId: '', takes: []}]},
    ];
    const selectedTakes = [{chunkNum: 1, publishedTake: {id: 1, chunk: 1}, playing: false}];
    const store = mockStore({alternateTakes: []});
    return store.dispatch(getAlternateTakes(selectedTakes)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  test('getSelectedTakes function', ()=> {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response:
          [{id: 1, published_take: {id: 1, location: 'xxx'},startv: 1 },
            {id: 2, published_take: {id: 2, location: 'yyy'},startv: 4 }],
      });
    });
    const expectedActions = [
      {type: 'LOADING'},
      {type: 'GET_SELECTED_TAKES',
        selectedTakes: [{publishedTake: {id: 1, location: 'xxx'}, chunkNum: 1, playing: false},
          {publishedTake: {id: 2, location: 'yyy'}, chunkNum: 4, playing: false}]},
    ];
    const store = mockStore({alternateTakes: []});
    return store.dispatch(getSelectedTakes(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test.skip('setTake function', ()=> {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response:
          {id: 1, published_take: {id: 1, location: 'xxx'},startv: 1, chunk: 1 }});
    });
    const expectedActions = [
      {type: 'UPDATE_ALTERNATE_TAKES',
        take: {id: 1, published_take: {id: 1, location: 'xxx'},startv: 1, chunk: 1 },
        oldId: 1,
        takeIndex: 0,
        chunkIndex: 0,
        tempTakeIndex: 0,
      }];
      /*setTake(1,
        {publishedTake: {id: 2},chunkNum: 1, playing: false},
        0,
        [{chunkId: 1, takes: [{id: 1}]}, {chunkId: 3, takes: [{id: 5}]}])) */
    const store = mockStore({alternateTakes: []});
    return store.dispatch(
      setTake(1, {publishedTake: {id: 2},chunkNum: 1, playing: false},))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('swapTake function', () => {
    const take = {id: 1, location: 'xxx' };
    const index = 0;
    const expectedAction = {
      type: 'SWAP_TAKE',
      take: {id: 1, location: 'xxx' },
      index: 0,
    };
    expect(swapTake(take, index)).toEqual(expectedAction);
  });

  test('undoSwapTake function', () => {
    const take = {id: 1, location: 'xxx' };
    const index = 0;

    const expectedAction = {
      type: 'UNDO_SWAP',
      index: 0,
      take: {id: 1, location: 'xxx' },
    };
    expect(undoSwapTake(take, index)).toEqual(expectedAction);
  });

  test('togglePlay function', ()=> {
    const playing = true;
    const expectedAction = {
      type: 'PLAY_PAUSE_SELECTED_TAKE',
      playing: true,
    };

    expect(togglePlay(playing)).toEqual(expectedAction);
  });

  test('updateActiveChunkIndex function (play through)', ()=> {
    const activeChunkIndex = 0;
    const index = null;
    const takesPlaying = true;
    const expectedAction = {
      type: 'UPDATE_ACTIVE_CHUNK_INDEX',
      index: activeChunkIndex+1,
      takesPlaying: true,
    };
    expect(updateActiveChunkIndex(activeChunkIndex,index,takesPlaying)).toEqual(expectedAction);
  });

  test('updateActiveChunkIndex function (skiping)', ()=> {
    const activeChunkIndex = 0;
    const index = 0;
    const takesPlaying = false;
    const expectedAction = {
      type: 'UPDATE_ACTIVE_CHUNK_INDEX',
      index: activeChunkIndex,
      takesPlaying: false,
    };
    expect(updateActiveChunkIndex(activeChunkIndex,index,takesPlaying)).toEqual(expectedAction);
  });

  test('updateActiveChunkIndex function (finished playing)', ()=> {
    const activeChunkIndex = 0;
    const index = 'done';
    const takesPlaying = false;
    const expectedAction = {
      type: 'FINISH_PLAYING',
      index: activeChunkIndex,
      takesPlaying: false,
    };
    expect(updateActiveChunkIndex(activeChunkIndex,index,takesPlaying)).toEqual(expectedAction);
  });

  test('clearAlternateTakes function', ()=> {
    const expectedAction = {
      type: 'CLEAR_ALTERNATE_TAKES',
    };
    expect(clearAlternateTakes()).toEqual(expectedAction);
  });

});
