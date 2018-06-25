/* global expect describe it */
import reducer from '../../../js/reducers/ProjectsPageReducer';
import * as types from '../../../js/reduxConstants';
describe('ProjectsPageReducer', () => {
  it('should return initial state', ()=> {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: '',
      projects: [],
      currentProjectQuery: '',
    });
  });

  it('should handle ALL_PROJECTS_SUCCESS', () => {
    expect(reducer([],{
      type: types.ALL_PROJECTS_SUCCESS,
      response: ['project1','project2'],
      queryString: 'current query string',
    })).toEqual({
      projects: ['project1','project2'],
      loading: false,
      currentProjectQuery: 'current query string',
    });
  });

  it('should handle ALL_PROJECTS_FAILED', () => {
    expect(reducer([],{
      type: types.ALL_PROJECTS_FAILED,
      err: 'all projects failed',
    })).toEqual({
      error: 'all projects failed',
      loading: false,
    });
  });

  it('should handle ALL_PROJECTS_LOADING', () => {
    expect(reducer([],{
      type: types.ALL_PROJECTS_LOADING,
    })).toEqual({
      loading: true,
    });
  });

  it('should handle ALL_PROJECTS_RESET', () => {
    expect(reducer([],{
      type: types.ALL_PROJECTS_RESET,
    })).toEqual({
      loading: false,
      currentProjectQuery: '',
      projects: [],
    });
  });
});
