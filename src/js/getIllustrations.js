export default function getIllustrations(bookSlug) {

  switch (bookSlug) {
    case 'mat':
      return {
        picker: require('../assets/Book_Illustrations/Matthew_Picker.jpg'),
        sketch: require('../assets/Book_Illustrations/Matthew_Sketch_Medium.jpg'),
      };

    case 'mrk':
      return {
        picker: require('../assets/Book_Illustrations/Mark_Picker.jpg'),
        sketch: require('../assets/Book_Illustrations/Mark_Sketch.jpg'),
      };

    case 'luk':
      return {
        picker: require('../assets/Book_Illustrations/Luke_Picker.jpg'),
        sketch: require('../assets/Book_Illustrations/Luke_Sketch.jpg'),
      };

    case 'jhn':
      return {
        picker: require('../assets/Book_Illustrations/John_Picker.png'),
        sketch: require('../assets/Book_Illustrations/John_Sketch.jpg'),
      };

    default:
      return {
        picker: require('../assets/Book_Illustrations/default.jpg'),
        sketch: require('../assets/Book_Illustrations/default.jpg'),

      };
  }
}
