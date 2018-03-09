import axios from "axios";
import config from "../../config/config";

export function fetchRecentProjects() {
	return function (dispatch) {
		return axios
			.get(config.apiUrl + "projects/",{
				headers: { Authorization: "Token " + localStorage.getItem('token') }
			})
			.then(response => {
				dispatch(dispatchHomeRecentProjectsReceived(response.data));
			})
			.catch(err => {
				dispatch(dispatchHomeRecentProjectsErr(err));
			});
	};
}

export function dispatchHomeRecentProjectsReceived(response) {

	return {
		type: 'HOME_RECENT_PROJECTS_RECEIVED',
		response
	}
}
export function dispatchHomeRecentProjectsErr(error) {

	return {
		type: 'HOME_RECENT_PROJECTS_ERR',
		error
	}
}
