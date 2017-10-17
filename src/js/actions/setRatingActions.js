import axios from "axios";
import config from "../../config/config";
import { SET_RATING} from './types';


export const setRating = () => {
  return {
    type: SET_RATING
  }
};


export const patchTake = (takeId, patch, success) => {

  return  (dispatch) => {
    return axios
      .post(config.apiUrl + "all_projects/", {})
      .then(response => {
        dispatch(dispatchHomeRecentProjectsReceived(response.data));
      })
      .catch(err => {
        dispatch(dispatchHomeRecentProjectsErr(err));
      });
  };



}



export const dispatchHomeRecentProjectsReceived = (response)=> {
	return {
		type: 'HOME_RECENT_PROJECTS_RECEIVED',
		response
	}
}
export const dispatchHomeRecentProjectsErr = (error) => {
	return {
		type: 'HOME_RECENT_PROJECTS_RECEIVED',
		error
	}
}
