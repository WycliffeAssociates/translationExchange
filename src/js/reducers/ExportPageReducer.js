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
        numbersSelected: [...state.numbersSelected, action.number],
      };

    case 'REMOVE_SELECTED':

      return {
        ...state, chaptersSelected: action.chaptersSelected.concat(),
        numbersSelected: action.numbersSelected.concat(),
      };

    case 'RESET_SELECTED':
      return INITIAL_STATE;




    default: return state;
  }
};
