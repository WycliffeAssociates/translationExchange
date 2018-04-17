/* global describe it expect */
import { updateLanguage } from '../../js/actions';
import {UPDATE_LANGUAGE}  from '../../js/actions/types';

describe('Direction Actions suite', () => {

  it.skip('should update the direction of the text', ()=> {
    const language = 'new language';
    const expectedAction = {
      type: UPDATE_LANGUAGE,
      updatelanguage: language,
    };

    expect(updateLanguage(language)).toEqual(expectedAction);

  });
});
