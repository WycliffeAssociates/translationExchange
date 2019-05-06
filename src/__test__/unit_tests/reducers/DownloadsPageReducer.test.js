/* global expect describe it */
import reducer from '../../../js/reducers/DownloadPageReducer';
import * as types from '../../../js/reduxConstants';
describe('DownloadsPageReducer', () => {
  it('should return initial state', ()=> {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: '',
      downloads: [],
    });
  });

  it('should handle DOWNLOADS_LIST_SUCCESS', () => {
    expect(reducer([],{
      type: types.DOWNLOADS_LIST_SUCCESS,
      response: ['client.apk','client.exe','client.AppImage','client.mac.zip'],
    })).toEqual({
      downloads: ['client.apk','client.exe','client.AppImage','client.mac.zip'],
      loading: false,
    });
  });

  it('should handle DOWNLOADS_LIST_FAILED', () => {
    expect(reducer([],{
      type: types.DOWNLOADS_LIST_FAILED,
      err: 'download list failed',
    })).toEqual({
      error: 'download list failed',
      loading: false,
    });
  });

  it('should handle DOWNLOADS_LIST_LOADING', () => {
    expect(reducer([],{
      type: types.DOWNLOADS_LIST_LOADING,
    })).toEqual({
      loading: true,
    });
  });
});
