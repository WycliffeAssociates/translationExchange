import config from '../config/config';

export default function getIllustrations(bookSlug) {

  let defaultPicker = require(`../assets/Book_Illustrations/default.jpg`);
  let defaultSketch = require(`../assets/Book_Illustrations/default.jpg`);
  let bookPicker;
  let bookSketch;

  try {
    bookPicker = require(`../assets/Book_Illustrations/${bookSlug}_Picker.jpg`);
    bookSketch = require(`../assets/Book_Illustrations/${bookSlug}_Sketch_Medium.jpg`);
  } catch(error) {
    bookPicker = defaultPicker;
    bookSketch = defaultSketch;
  }

  if (bookSlug != undefined) {
    return {
      picker: bookPicker,
      sketch: bookSketch,
    };
  } else {
    return {
      picker: defaultPicker,
      sketch: defaultSketch,
    };
  }
}
