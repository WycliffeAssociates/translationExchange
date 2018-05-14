import axios from 'axios'
import config from '../../config/config';

export const getChapters = (projectId, redirect) =>{
  return dispatch => {
    dispatch({type: 'FETCHING_CHAPTERS'});
    return axios
      .get(`${config.apiUrl}chapters/?project_id=${projectId}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') },
        })
      .then(response => {
        dispatch(getChaptersSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
        redirect.push('./ErrorPage');
      });
  };

};

export const getChaptersSuccess = (chapters) =>{
  return {
    type: 'GET_CHAPTERS_SUCCESS',
    chapters,
  };


};

//download project
export function downloadProject(projectId, file_format) {

  return function(dispatch) {
    return axios
      .get(config.apiUrl + `zip/?id=${projectId}&file_format=${file_format}`,
        {
          headers: { Authorization: 'Token ' + localStorage.getItem('token') }}
      )
      .then(response => {
        //Todo: find the better way to download files
        window.location = config.streamingUrl + response.data.location;
      })
      .catch(err => {
        dispatch(dispatchdownloadProjectFailed(err));
      // }).catch(exception => {
        // dispatchdownloadProjectException(exception);
        // });
      });
  };
}


export function dispatchdownloadProjectFailed(error) {
  return {
    type: 'DOWNLOAD_PROJECT_FAILED',
    error: error.toString(),
  };
}
// export function dispatchdownloadProjectException(exception) {
//     return {
//         type: 'DOWNLOAD_PROJECT_EXCEPTION',
//         downloadError: exception
//     }
// }
