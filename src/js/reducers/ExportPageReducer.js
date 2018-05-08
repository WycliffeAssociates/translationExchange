const INITIAL_STATE = {
  chaptersSelected: [],
  numbersSelected: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_SELECTED':
      return {
        ...state,
        chaptersSelected: [...state.chaptersSelected, action.id],
      };

    case 'REMOVE_SELECTED':

      return {
        ...state, chaptersSelected: action.chaptersSelected.concat(),
      };

    case 'ADD_SELECTED_NUMBER':
      return {
        ...state,
        numbersSelected: [...state.numbersSelected, action.number],
      };

    case 'REMOVE_SELECTED_NUMBER':

      return {
        ...state, numbersSelected: action.numbersSelected.concat(),
      };


    default: return state;
  }
};
