/* global describe test expect */
import getIllustrations from '../../js/getIllustrations';

describe('getIllustrations function',() => {
  test('Test the getIllustrations function', ()=> {
    const expected = {
      picker: `mat_Picker.jpg`,
      sketch: `mat_Sketch_Medium.jpg`,
    };
    expect(getIllustrations('mat')).toEqual(expected);
  });

  test('default response', ()=> {
    const expected = {
      picker: `default.jpg`,
      sketch: `default.jpg`,
    };
    expect(getIllustrations()).toEqual(expected);
  });
});
