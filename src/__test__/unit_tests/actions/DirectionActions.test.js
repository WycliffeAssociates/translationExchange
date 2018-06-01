/* global describe it expect */
import { updateDirection } from '../../../js/actions';
import {UPDATE_DIRECTION}  from '../../../js/reduxConstants';

describe('Direction Actions suite', () => {

  it('should update the direction of the text', ()=> {
    const direction = 'rtl';
    const expectedAction = {
      type: UPDATE_DIRECTION,
      updateDirection: direction,
    };

    expect(updateDirection(direction)).toEqual(expectedAction);

  });
});
