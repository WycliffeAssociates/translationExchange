export default function getIllustrations(bookSlug) {

  try {
    return {
      picker: require(`../assets/Book_Illustrations/${bookSlug}_Picker.jpg`),
      sketch: require(`../assets/Book_Illustrations/${bookSlug}_Sketch_Medium.jpg`),
    };
  }

  catch (err) {
    return {
      picker: require('../assets/Book_Illustrations/default.jpg'),
      sketch: require('../assets/Book_Illustrations/default.jpg'),

    };
  }
}
