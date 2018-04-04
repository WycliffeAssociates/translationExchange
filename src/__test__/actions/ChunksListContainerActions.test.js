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

  it('should FETCH_TAKE_SUCCESS_FIRST_TIME', () => {

  });

});
