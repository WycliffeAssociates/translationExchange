/* global expect describe it */
import reducer from '../../../js/reducers/KanbanPageReducer';

describe('KanbanPageReducer' ,() => {
  it('should return initial state', ()=> {
    expect(reducer(undefined,{})).toEqual({
      takes: [],
      chunks: [],
      chunkNum: 1,
      activeChunkId: 1,
      publishedTakes: [],
      loading: false,
      playingTakeId: '',
      project: null,
      takesToDelete: [],
      removedTaketoDelete: false,
    });
  });

  it('should handle LOADING', ()=> {
    expect(reducer([],{
      type: 'LOADING',
    })).toEqual({
      loading: true,
    });
  });

  it('should handle FETCH_TAKE_SUCCESS', ()=> {
    expect(reducer([],{
      type: 'FETCH_TAKE_SUCCESS',
      takes: ['take1' , 'take2'],
      chunkNum: 1,
      activeChunkId: 1,
    })).toEqual({
      loading: false,
      activeChunkId: 1,
      chunkNum: 1,
      takes: ['take1' , 'take2'],
    });
  });

  it('should handle FETCH_CHUNKS_SUCCESS', ()=> {
    expect(reducer([],{
      type: 'FETCH_CHUNKS_SUCCESS',
      chunks: ['chunk1' , 'chunk2'],
      chunkId: 1,
    })).toEqual({
      loading: false,
      activeChunkId: 1,
      chunks: ['chunk1' , 'chunk2'],
    });
  });

  it('should handle PATCH_TAKE_SUCCESS', ()=> {
    expect(reducer([],{
      type: 'PATCH_TAKE_SUCCESS',
      updatedTakes: ['take1' , 'take2'],
      chunkId: 1,
    })).toEqual({
      takes: ['take1' , 'take2'],
      loading: false,
    });
  });

  it('should handle PATCH_CHAPTER_SUCCESS', ()=> {
    expect(reducer([],{
      type: 'PATCH_CHAPTER_SUCCESS',
      chapter: {},
    })).toEqual({
      chapter: {},
    });
  });

  it('should handle UPDATE_PLAYING_TAKE', ()=> {
    expect(reducer([],{
      type: 'UPDATE_PLAYING_TAKE',
      takeId: 299,
    })).toEqual({
      playingTakeId: 299,
    });
  });


  it('should handle ADD_TAKE_TO_DELETE', ()=> {
    expect(reducer({takesToDelete: [1]},{
      type: 'ADD_TAKE_TO_DELETE',
      takeId: 299,
    })).toEqual({
      takesToDelete: [1,299],
    });
  });

  it('should handle REMOVE_TAKE_TO_DELETE', ()=> {
    expect(reducer({takesToDelete: [1,299]},{
      type: 'REMOVE_TAKE_TO_DELETE',
      takesToDelete: [1],
    })).toEqual({
      takesToDelete: [1],
      removedTaketoDelete: true,
    });
  });

  it('should handle NO_TAKES_FOR_CHUNK', ()=> {
    expect(reducer([],{
      type: 'NO_TAKES_FOR_CHUNK',
      takes: ['take1', 'take2'],
      chunkNum: 1,
      activeChunkId: 12,
    })).toEqual({
      takes: ['take1', 'take2'],
      chunkNum: 1,
      activeChunkId: 12,
      loading: false,
    });
  });

  it('should handle UPDATE_TAKE', ()=> {
    expect(reducer([],{
      type: 'UPDATE_TAKE',
    })).toEqual({
      removedTaketoDelete: false,
    });
  });

  it('should handle SET_PROJECT', () => {
    expect(reducer([],{
      type: 'SET_PROJECT',
      slug: 'mat',
    })).toEqual({
      project: 'mat',
    });
  });

});
