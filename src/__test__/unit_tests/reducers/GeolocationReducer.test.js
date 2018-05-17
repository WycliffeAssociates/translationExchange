/* global expect describe it test */
import reducer from '../../../js/reducers/GeolocationReducer';
import * as types from '../../../js/actions/types';
import language from '../../../languages/textToDisplay.json';


describe('Geolocation Reducer', ()=> {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      txt: language.English,
    });
  });

  it('should handle UPDATE_LANGUAGE',() => {
    expect(reducer([],{
      type: types.UPDATE_LANGUAGE,
      updatelanguage: 'swahili',
    })).toEqual({
      txt: 'swahili',
    });
  });
});
