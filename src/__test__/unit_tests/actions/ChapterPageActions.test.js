/* global describe it expect  beforeEach afterEach*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getChapters, downloadProject } from '../../../js/actions';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ChaptersPageActions Test Suite', () => {
  beforeEach(()=> {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should getChapters', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response:
          [{},{}],

      });
    });

    const expectedActions = [
      {type: 'FETCHING_CHAPTERS'},
      {
        type: 'GET_CHAPTERS_SUCCESS',
        chapters: [{},{}],
      }];

    const store = mockStore({chapters: []});
    return store.dispatch(getChapters()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it.skip('should download the project', () => {
    //this test is passing, even though it dispatches and error
    //action not access window to perform download, spike new ways to download
    moxios.wait(()=> {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [],
      });
    });

    const expectedActions = [{
      type: 'DOWNLOAD_PROJECT_FAILED',
      error: 'TypeError: Cannot set property location of #<Window> which has only a getter',
    }];
    const store = mockStore({});
    return store.dispatch(downloadProject()).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });


  });

  it ('should fail to download project', () => {
    moxios.wait(()=> {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: [],
      });
    });

    const expectedActions = [{
      type: 'DOWNLOAD_PROJECT_FAILED',
      error: 'Error: Request failed with status code 400',
    }];

    const store = mockStore({});
    return store.dispatch(downloadProject()).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
