/* global it expect describe  test*/
import {loadState, saveState} from '../js/localState';

describe('test fetching state from local storage', () => {

  test('the load State function', () => {

    expect(loadState()).toEqual(undefined);
    /*should be undefined b/c localStorage isn't accessed from tests, so try catch
    returns undefined
    */
  });

  test('the saveState function', () => {

    expect(saveState()).toEqual(undefined);
    /*should be undefined b/c localStorage isn't accessed from tests, so try catch
    returns undefined
    */

  });

});
