/* global describe it expect  beforeEach afterEach jest*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getDownloads } from '../../../js/actions';
import * as types from '../../../js/reduxConstants';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Downloads Page Actions suite', () => {

  beforeEach(()=> {
    moxios.install();
  });

  afterEach(()=> {
    moxios.uninstall();
  });

  it('should fetch all downloadble files successfully', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        reponse: [{}],
      });
    });

    const expectedActions = [
      {type: types.DOWNLOADS_LIST_LOADING},
      {type: types.DOWNLOADS_LIST_SUCCESS, response: undefined, queryString: undefined}
    ];
    
    const store = mockStore({downloads: []});
    
    return store.dispatch(getDownloads()).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should not fetch all downloads', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        reponse: [{}],
      });
    });

    const expectedActions = [
      {type: types.DOWNLOADS_LIST_LOADING},
      {type: types.DOWNLOADS_LIST_FAILED, err: 'Error: Request failed with status code 404'}
    ];
    
    const store = mockStore({downloads: []});
    
    return store.dispatch(getDownloads('query', [])).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
