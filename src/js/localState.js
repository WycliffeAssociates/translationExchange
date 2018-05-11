export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('te:KanbanPage');
    if (serializedState === null) {
      return undefined;
    }

    return {kanbanPage: JSON.parse(serializedState)};
  }
  catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.kanbanPage);
    localStorage.setItem('te:KanbanPage', serializedState);
  }
  catch (err) {
    //
  }
};
