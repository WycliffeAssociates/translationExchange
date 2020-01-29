/* global expect describe it  */
import reducer from '../../../js/reducers/GeolocationReducer';
import * as types from '../../../js/reduxConstants';
import language from '../../../languages/textToDisplay.json';


describe('Geolocation Reducer', ()=> {
  it('should return the initial state', () => {
    expect(JSON.stringify(reducer(undefined, {}))).toEqual(JSON.stringify({
      txt: {
        get: jest.fn(),
        language: language.English
      },
      localization: language
    }));
  });

  it('should handle UPDATE_LANGUAGE',() => {
    expect(JSON.stringify(reducer(undefined, {
      type: types.UPDATE_LANGUAGE,
      updatelanguage: 'Cebuano',
    }))).toEqual(JSON.stringify({
      txt: {
        get: jest.fn(),
        language: language.Cebuano
      },
      localization: language
    }));
  });

});
