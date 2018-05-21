export default function getIllustrations(bookSlug) {

  if (bookSlug) {
    return {
      picker: require(`../assets/Book_Illustrations/${bookSlug}_Picker.jpg`),
      sketch: require(`../assets/Book_Illustrations/${bookSlug}_Sketch_Medium.jpg`),
    };
  }

  else {
    return {
      picker: require('../assets/Book_Illustrations/default.jpg'),
      sketch: require('../assets/Book_Illustrations/default.jpg'),

    };
  }
}
