/* global describe it expect  beforeEach afterEach jest*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAllProjects, importProject } from '../../../js/actions';
import * as types from '../../../js/reduxConstants';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Projects Page Actions suite', () => {

  beforeEach(()=> {
    moxios.install();
  });

  afterEach(()=> {
    moxios.uninstall();
  });

  it('should fetch all projects successfully', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        reponse: [{}],
      });
    });

    const expectedActions = [{type: types.ALL_PROJECTS_LOADING},
      {type: types.ALL_PROJECTS_SUCCESS, response: undefined, queryString: undefined}];
    const store = mockStore({projects: []});
    return store.dispatch(fetchAllProjects()).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  it('should not fetch all projects', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        reponse: [{}],
      });
    });

    const expectedActions = [{type: types.ALL_PROJECTS_LOADING},
      {type: types.ALL_PROJECTS_FAILED, err: 'Error: Request failed with status code 404'}];
    const store = mockStore({projects: []});
    return store.dispatch(fetchAllProjects('query', [])).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });


  it('should import a project', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        reponse: [{}],
      });
    });

    const expectedActions = [{type: types.IMPORT_PROJECT}];
    const store = mockStore({});
    return store.dispatch(importProject('query', [])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

});
