/* global describe it expect  beforeEach afterEach jest*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAllProjects } from '../../../js/actions';
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

    const expectedActions = [{type: 'ALL_PROJECTS_LOADING'},
      {type: 'ALL_PROJECTS_SUCCESS', response: undefined, queryString: undefined}];
    const store = mockStore({projects: []});
    return store.dispatch(fetchAllProjects()).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });


});
