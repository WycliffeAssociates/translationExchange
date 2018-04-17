/* global describe it expect beforeEach afterEach */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getAudioTakes, getAudioComments, setSourceProject, getSelectedProjectInfo } from '../../js/actions';
import moxios from 'moxios';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe.skip('chunkListContainerActions', () => {
  beforeEach(()=> {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should FETCH_TAKE_SUCCESS', () => {
    moxios.wait(()=> {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{}],
      });
    });

    const expectedActions = [
      {type: 'FETCH_TAKE_SUCCESS', selectedChunk: undefined, takes: [{chunkId: undefined }] }];

    const store = mockStore({takes: []});

    return store.dispatch(getAudioTakes()).then(()=> {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
