const INITIAL_STATE = {
  tasks: [],
};

export default (state = INITIAL_STATE, action ={}) => {
  if (action.type === 'FETCH_TASKS_SUCCESS') {
    return {
      ...state,
      tasks: action.tasks,
    };
  }
  else {
    return state;
  }
};
