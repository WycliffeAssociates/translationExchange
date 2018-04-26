/* global describe it expect  beforeEach afterEach*/
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GET_AUTH_TOKEN } from '../../js/actions';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('AuthActions Test Suite', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should retrieve a oauth code from github', ()=> {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{
          client_id: '1111111',
          client_secret: 'secret',
          code: '123456789',
          accept: 'json',
        }],
      });

      const expectedActions = [{}];
      const store = mockStore({});

      return store.dispatch(GET_AUTH_TOKEN()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

});
