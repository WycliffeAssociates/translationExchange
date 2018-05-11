/* global  describe it beforeEach afterEach expect*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchRecentProjects } from '../../../js/actions';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe.skip('fetchRecentProjects', ()=> {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(()=> {
    moxios.uninstall();
  });

  it('has action type:HOME_RECENT_PROJECTS_RECEIVED', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {projects: []},
      });
    });

    const expectedActions = [
      {type: 'HOME_RECENT_PROJECTS_RECEIVED', response: {projects: []},
      }];

    const store = mockStore({projects: []});
    return store.dispatch(fetchRecentProjects()).then(()=> {
      expect (store.getActions()).toEqual(expectedActions);
    });
  });

  it('has action type: HOME_RECENT_PROJECTS_ERR', () => {
    // const err = [Error: Request failed with status code 401];
    moxios.wait(()=> {
      const request = moxios.requests.mostRecent();
      request.respondWith ({
        status: 401,
      });
    });

    const expectedActions = [{type: 'HOME_RECENT_PROJECTS_ERR',
      error: 'Error: Request failed with status code 401'}];

    const store = mockStore({projects: []});
    return store.dispatch(fetchRecentProjects()).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
