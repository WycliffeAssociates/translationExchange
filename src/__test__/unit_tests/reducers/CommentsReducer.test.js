/* global expect describe it test */
import reducer from '../../../js/reducers/CommentsReducer';

describe('Comments Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined,{})).toEqual({
      chapterComments: [],
      chunkComments: [],
      uploadingComments: false,
      uploadError: false,
    });
  });

  it('should handle CHUNK_COMMENTS', ()=> {
    expect(reducer([],{
      type: 'CHUNK_COMMENTS',
      comments: ['chunkComment1', 'chunkComment2'],
    })).toEqual({
      chunkComments: ['chunkComment1', 'chunkComment2'],
    });
  });

  it('should handle CHAPTER_COMMENTS', ()=> {
    expect(reducer([],{
      type: 'CHAPTER_COMMENTS',
      comments: ['chapterComment1', 'chapterComment2'],
    })).toEqual({
      chapterComments: ['chapterComment1', 'chapterComment2'],
    });
  });


  it('should handle SAVE_COMMENT_LOADING', ()=> {
    expect(reducer([],{
      type: 'SAVE_COMMENT_LOADING',
      uploadingComments: true,
    })).toEqual({
      uploadingComments: true,
    });
  });

  it('should handle SAVE_COMMENT_DONE', ()=> {
    expect(reducer([],{
      type: 'SAVE_COMMENT_DONE',
      uploadingComments: false,
    })).toEqual({
      uploadingComments: false,
    });
  });


  it('should handle UPDATE_CHUNK_COMMENTS', ()=> {
    expect(reducer({chunkComments: ['1stChunk']},{
      type: 'UPDATE_CHUNK_COMMENTS',
      comment: ['chunkComment1', 'chunkComment2'],
    })).toEqual({
      chunkComments: ['1stChunk',['chunkComment1', 'chunkComment2']],
    });
  });

  it('should handle UPDATE_CHAPTER_COMMENTS', ()=> {
    expect(reducer({chapterComments: ['1stChapter']},{
      type: 'UPDATE_CHAPTER_COMMENTS',
      comment: ['chapterComment1', 'chapterComment2'],
    })).toEqual({
      chapterComments: ['1stChapter',['chapterComment1', 'chapterComment2']],
    });
  });

  it('should handle UPLOAD_COMMENT_ERROR', ()=> {
    expect(reducer([],{
      type: 'UPLOAD_COMMENT_ERROR',
      uploadingComments: false,
      uploadError: true,
    })).toEqual({
      uploadingComments: false,
      uploadError: true,
    });
  });

  it('should handle RESET_ERROR', ()=> {
    expect(reducer([],{
      type: 'RESET_ERROR',
      uploadError: false,
    })).toEqual({
      uploadError: false,
    });
  });



});
