/* global describe it expect  beforeEach afterEach*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getChapters } from '../../js/actions';
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



});
