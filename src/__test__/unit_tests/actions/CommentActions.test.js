/* global describe it expect  beforeEach afterEach jest*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getComments, saveComment } from '../../../js/actions';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Comments Actions Test Suite', ()=> {
  beforeEach(()=> {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should get comments for chunk successfully', ()=> {
    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{}],
      });
    });

    const expectedActions = [{
      type: 'CHUNK_COMMENTS',
      comments: [{}],
    }];

    const store = mockStore({});

    return store.dispatch(getComments('query', 'chunk_id')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('should get comments for chapter successfully', ()=> {
    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{}],
      });
    });

    const expectedActions = [{
      type: 'CHAPTER_COMMENTS',
      comments: [{}],
    }];

    const store = mockStore({});

    return store.dispatch(getComments('query', 'chapter_id')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('should save a chunk comment', ()=> {
    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{}],
      });
    });

    const expectedActions = [
      {type: 'SAVE_COMMENT_LOADING', uploadingComments: true},
      { type: 'UPDATE_CHUNK_COMMENTS',
        comment: [{}],
      },
      {type: 'SAVE_COMMENT_DONE', uploadingComments: false}];

    const store = mockStore({});

    return store.dispatch(saveComment('blobx', 'chunk', 1, null, null, jest.fn(), null)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should save a chapter comment', ()=> {
    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{}],
      });
    });

    const expectedActions = [
      {type: 'SAVE_COMMENT_LOADING', uploadingComments: true},
      { type: 'UPDATE_CHAPTER_COMMENTS',
        comment: [{}],
      },
      {type: 'SAVE_COMMENT_DONE', uploadingComments: false}];

    const store = mockStore({});

    return store.dispatch(saveComment('blobx', 'chapter', 1, null, null, jest.fn(), null)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('should save a take comment', ()=> {
    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{}],
      });
    });

    const expectedActions = [
      {type: 'SAVE_COMMENT_LOADING', uploadingComments: true},
      { type: 'LOADING' },
      {type: 'SAVE_COMMENT_DONE', uploadingComments: false}];

    const store = mockStore({});

    return store.dispatch(saveComment('blobx', 'take', 1, null, null, jest.fn(), null)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


});
