/* global expect describe it test */
import reducer from '../../../js/reducers/DirectionReducer'
import * as types from '../../../js/actions/types';

describe('DirectionReducer', ()=> {
  it('should return the initial state', () => {
    expect(reducer(undefined,{})).toEqual({
      direction: 'ltr',
    });
  });

  it('should handle the UPDATE_DIRECTION',() => {
    expect(reducer([],{
      type: types.UPDATE_DIRECTION,
      updateDirection: 'rtl',
    })).toEqual({
      direction: 'rtl',
    });
  });

});
