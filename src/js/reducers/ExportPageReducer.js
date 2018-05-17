const INITIAL_STATE = {
  chaptersSelected: [],
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

      };

    case 'REMOVE_SELECTED':

      return {
        ...state, chaptersSelected: action.chaptersSelected.concat(),

      };

    case 'GENERATING_DOWNLOAD':
      return {
        ...state, taskId: action.taskId,
      };

    case 'UPDATE_PROGRESS':
      return {...state, progress: action.progress};

    case 'RESET_SELECTED':
      return INITIAL_STATE;

    default: return state;
  }
};
