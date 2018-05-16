const INITIAL_STATE = {
  chaptersSelected: [],
  numbersSelected: [],
  downloadInProgress: false,
  loading: false,
  taskId: null,
  progress: null,
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

    case 'PREPARING_DOWNLOAD':
      return {
        ...state, taskId: action.taskId, downloadInProgress: true,
      };

    case 'UPDATE_PROGRESS':
      return {...state, progress: action.progress};

    case 'RESET_SELECTED':
      return INITIAL_STATE;

    default: return state;
  }
};
