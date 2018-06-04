/* global describe it expect */
import { updateLanguage } from '../../../js/actions';
import {UPDATE_LANGUAGE}  from '../../../js/reduxConstants';

describe('Geolocation Actions suite', () => {

  it('should update the language of the text', ()=> {
    const language = 'new language';
    const expectedAction = {
      type: UPDATE_LANGUAGE,
      updatelanguage: language,
    };

    expect(updateLanguage(language)).toEqual(expectedAction);

  });
});
