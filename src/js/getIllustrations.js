import config from '../config/config';

export default function getIllustrations(bookSlug) {

  if (bookSlug != undefined) {
    return {
      picker: `${config.streamingUrl}static/Book_Illustrations/${bookSlug}_Picker.jpg`,
      sketch: `${config.streamingUrl}static/Book_Illustrations/${bookSlug}_Sketch_Medium.jpg`,
    };
  } else {
    return {
      picker: `${config.streamingUrl}static/Book_Illustrations/default.jpg`,
      sketch: `${config.streamingUrl}static/Book_Illustrations/default.jpg`,
    };
  }
}
