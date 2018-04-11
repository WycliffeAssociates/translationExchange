import axios from 'axios'
import config from '../../config/config';

export const getChapters = (projectId) =>{
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
      });
  };

};

export const getChaptersSuccess = (chapters) =>{
    return{
        type: 'GET_CHAPTERS_SUCCESS',
        chapters
    }


};

export const upgradeCheckingLevel = () =>{
    // return dispatch => {
    //     return axios
    //         .patch(`${config.apiUrl}chapters/?project_id=${projectId}`,
    //             {
    //                 headers: { Authorization: 'Token ' + localStorage.getItem('token') },
    //             })
    //         .then(response => {
    //
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };

};
