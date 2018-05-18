/* global describe test expect */
import getIllustrations from '../../js/getIllustrations';

describe('getIllustrations function',() => {
  test('Test the getIllustrations function', ()=> {
    const expected = {
      picker: require('../../assets/Book_Illustrations/Matthew_Picker.jpg'),
      sketch: require('../../assets/Book_Illustrations/Matthew_Sketch_Medium.jpg'),
    };
    expect(getIllustrations('mat')).toEqual(expected);
  });

  test('default response', ()=> {
    const expected = {
      picker: require('../../assets/Book_Illustrations/default.jpg'),
      sketch: require('../../assets/Book_Illustrations/default.jpg'),
    };
    expect(getIllustrations()).toEqual(expected);
  });
});
