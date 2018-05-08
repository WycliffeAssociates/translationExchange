

export const selections = (id, type) => {

  return (dispatch, getState) => {
    const {chaptersSelected} = getState().ExportPage;

    if (!type) {             // add id to the array
      const index = chaptersSelected.indexOf(id);
      if (index > -1) {
        chaptersSelected.splice(index, 1);

        dispatch({ type: 'REMOVE_SELECTED', chaptersSelected})
      }

    }
    else {
      dispatch({ type: 'ADD_SELECTED', id})
    }
  }
}



export const selectedNumbers = (number, type) => {

  return (dispatch, getState) => {
    const { numbersSelected } = getState().ExportPage;

    if (!type) {             // add id to the array
      const index = numbersSelected.indexOf(number);
      if (index > -1) {
        numbersSelected.splice(index, 1);

        dispatch({ type: 'REMOVE_SELECTED_NUMBER', numbersSelected})
      }

    }
    else {
      dispatch({ type: 'ADD_SELECTED_NUMBER', number})
    }
  }
}
