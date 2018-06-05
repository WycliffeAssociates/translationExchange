const INITIAL_STATE = {
  tasks: [],
};

export default (state = INITIAL_STATE, action ={}) => {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.tasks,
      };

    default:
      return state;
  }
};
