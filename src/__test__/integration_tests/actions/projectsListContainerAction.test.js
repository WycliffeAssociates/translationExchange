/* global describe beforeEach afterEach it expect*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAllProjects } from '../../../js/actions';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe.skip('ProjectsListContainer Actions', () => {

  beforeEach(()=> {
    moxios.install();
  });

  afterEach(()=> {
    moxios.uninstall();
  });

  it('has action type: ALL_PROJECTS_LOADING  and ALL_PROJECTS_SUCCESS', () => {
    moxios.wait(()=> {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });

    const expectedActions = [
      {type: 'ALL_PROJECTS_LOADING'},
      {type: 'ALL_PROJECTS_SUCCESS', response: {}, queryString: undefined},
    ];

    const store = mockStore({ response: {}, queryString: {}});
    return store.dispatch(fetchAllProjects()).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('has action type: ALL_PROJECTS_LOADING  and ALL_PROJECTS_FAILED', () => {
    moxios.wait(()=> {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {},
      });
    });

    const expectedActions = [
      {type: 'ALL_PROJECTS_LOADING'},
      {type: 'ALL_PROJECTS_FAILED', err: 'Error: Request failed with status code 401'},
    ];

    const store = mockStore({ response: {}, queryString: {}});
    return store.dispatch(fetchAllProjects()).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
