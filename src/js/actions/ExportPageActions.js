import axios from 'axios';
import config from '../../config/config';

export const selections = (id,type) => {
  return (dispatch, getState) => {


    if (!type) {             // add id to the array
      const {chaptersSelected} = getState().ExportPage;
      const indexId = chaptersSelected.indexOf(id);

      if (indexId > -1 ) {
        chaptersSelected.splice(indexId, 1);

        dispatch({ type: 'REMOVE_SELECTED', chaptersSelected});
      }

    }
    else {
      dispatch({ type: 'ADD_SELECTED', id});
    }
  };
};


export const resetSelected = () => {
  return {
    type: 'RESET_SELECTED',
  };
};




export const downloadChapters = (type, chaptersIds) => {

  return dispatch => {
    return axios
      .get(`${config.apiUrl}export`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token')},
          params: {  file_format: type,
            chapters: chaptersIds},

        })
      .then(response => {
        const taskId = response.data.task_id;
        dispatch({type: 'GENERATING_DOWNLOAD', taskId});


      })
      .catch(error => {
        console.log(error);

      });
  };

};


export const transferProject = (id) => {

  return dispatch => {
    return axios
      .get(`${config.apiUrl}transfer?id=${id}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token')},
        }
      )
      .then(response => {
        const taskId = response.data.task_id;
        dispatch({type: 'GENERATING_DOWNLOAD', taskId});

      })
      .catch(error => {
        console.log(error);

      });
  };

};


export const getTransferProgress = (taskId, callback) => {

  return dispatch => {
    return axios
      .get(`${config.apiUrl}tasks/${taskId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token')},
        }
      )
      .then(response => {
        const {progress, details} = response.data;

        if (progress === 100) {
          callback(progress, true);
          window.location = config.streamingUrl + details.result;
          dispatch({ type: 'DOWNLOAD_COMPLETE'});
        } else {
          callback(progress);
          dispatch({ type: 'GETTING_DOWNLOAD_PROGRESS'});
        }


      })
      .catch(error => {
        console.log(error);

      });
  };

};


export const getDownloadProgress = (taskId, callback) => {

  return axios
    .get(`${config.apiUrl}tasks/${taskId}`,   {
      headers: { Authorization: 'Token ' + localStorage.getItem('token')},
    })
    .then(response => {
      const {progress, details} = response.data;

      if (progress === 100) {
        callback(progress, true);
        window.location = config.streamingUrl + details.result;
      } else {
        callback(progress);
      }

    })
    .catch(error => {
      console.log(error);

    });


};

export const resetExport = () => {
  return {
    type: 'RESET_SELECTED',
  };
};



export const updateExportModal = (prop, value) => {
  return {
    type: 'UPDATE_EXPORT_MODAL',
    prop,
    value,
  };
};
