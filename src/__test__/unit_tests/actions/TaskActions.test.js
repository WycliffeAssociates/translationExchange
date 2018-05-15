/* global describe it expect  beforeEach afterEach jest*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getTasks } from '../../../js/actions';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tasks Actions Test Suite', ()=> {
  beforeEach(()=> {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should get tasks successfully', ()=> {
    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{}],
      });
    });

    const expectedActions = [{
      type: 'FETCH_TASKS_SUCCESS',
      tasks: [{}],
    }];

    const store = mockStore({});

    return store.dispatch(getTasks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
