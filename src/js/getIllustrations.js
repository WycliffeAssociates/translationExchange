import config from '../config/config';

export default function getIllustrations(bookSlug) {

  try {
    return {
      picker: require(`${config.streamingUrl}static/Book_Illustrations/${bookSlug}_Picker.jpg`),
      sketch: require(`${config.streamingUrl}static/Book_Illustrations/${bookSlug}_Sketch_Medium.jpg`),
    };
  }

  catch (err) {
    return {
      picker: `${config.streamingUrl}static/Book_Illustrations/default.jpg`,
      sketch: `${config.streamingUrl}static/Book_Illustrations/default.jpg`,

    };
  }
}
