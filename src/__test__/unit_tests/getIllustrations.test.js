/* global describe test expect */
import getIllustrations from '../../js/getIllustrations';
import config from '../../config/config';

describe('getIllustrations function',() => {
  test('Test the getIllustrations function', ()=> {
    const expected = {
      picker: `${config.streamingUrl}static/Book_Illustrations/mat_Picker.jpg`,
      sketch: `${config.streamingUrl}static/Book_Illustrations/mat_Sketch_Medium.jpg`,
    };
    expect(getIllustrations('mat')).toEqual(expected);
  });

  test('default response', ()=> {
    const expected = {
      picker: `${config.streamingUrl}static/Book_Illustrations/default.jpg`,
      sketch: `${config.streamingUrl}static/Book_Illustrations/default.jpg`,
    };
    expect(getIllustrations()).toEqual(expected);
  });
});
