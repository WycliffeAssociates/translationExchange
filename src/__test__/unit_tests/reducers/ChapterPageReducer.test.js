/* global expect describe it */
import reducer from '../../../js/reducers/ChapterPageReducer';

describe('ChapterPageReducer', () => {

  it('should return the initial state', () =>{
    expect(reducer(undefined,{})).toEqual({
      chapters: [],
      loading: false,
      updatePage: false,
      uploadingComment: false,
    });
  });

  it('should hand FETCHING_CHAPTERS',() => {
    expect(reducer([],{
      type: 'FETCHING_CHAPTERS',
    })).toEqual({
      loading: true,
    });
  });


  it('should hand GET_CHAPTERS_SUCCESS',() => {
    expect(reducer([],{
      type: 'GET_CHAPTERS_SUCCESS',
      chapters: ['chapter1', 'chapter2', 'chapter3'],
    })).toEqual({
      chapters: ['chapter1', 'chapter2', 'chapter3'],
      loading: false,
    });
  });

});
