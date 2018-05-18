/* global describe it expect  beforeEach afterEach*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { downloadChapters } from '../../../js/actions';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ProjectPageActions Test Suite', () => {
  beforeEach(()=> {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Download Chapters', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response:
          {task_id: '123'},
      });
    });

    const expectedActions = [
      {type: 'GENERATING_DOWNLOAD',
        taskId: '123' },
    ];

    const store = mockStore({taskId: null});
    return store.dispatch(downloadChapters()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
