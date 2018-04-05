/* global describe it expect  beforeEach afterEach*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchChaptersContainerData } from '../../js/actions';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe.skip('ChaptersContainerAction', () => {
  beforeEach(()=> {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {chapters: []},
      });
    });

    const expectedActions = [{
      type: 'FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS', chapters: {chapters: []},
    }];

    const store = mockStore({chapters: []});
    let query = { project_id: 1, lang: 'eng', book: 'gen' };
    return store.dispatch(fetchChaptersContainerData(query)).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });



});
