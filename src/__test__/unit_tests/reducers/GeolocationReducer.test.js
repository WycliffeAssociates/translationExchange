/* global expect describe it  */
import reducer from '../../../js/reducers/GeolocationReducer';
import * as types from '../../../js/reduxConstants';
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
      txt: language['swahili'],
    });
  });

});
