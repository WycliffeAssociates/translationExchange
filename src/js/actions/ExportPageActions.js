import axios from 'axios';
import config from '../../config/config';

export const selections = (id, number, type) => {
  return (dispatch, getState) => {
    const {chaptersSelected, numbersSelected} = getState().ExportPage;

    if (!type) {             // add id to the array
      const indexId = chaptersSelected.indexOf(id);
      const indexNumber = numbersSelected.indexOf(number);
      if (indexId > -1 && indexNumber > -1) {
        chaptersSelected.splice(indexId, 1);
        numbersSelected.splice(indexNumber, 1);

        dispatch({ type: 'REMOVE_SELECTED', chaptersSelected, numbersSelected});
      }

    }
    else {
      dispatch({ type: 'ADD_SELECTED', id, number});
    }
  }
}


export const resetSelected = () => {
  return {
    type: 'RESET_SELECTED',
  };
};




export const download = (projectId, chaptersIds, type) => {
  return dispatch => {
    return axios
      .get(`${config.apiUrl}download/?${projectId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') },
        })
      .then(response => {

      })
      .catch(error => {
        console.log(error);
        
      });
  };

};
