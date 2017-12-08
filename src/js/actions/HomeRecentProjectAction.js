import axios from "axios";
import config from "../../config/config";

export function fetchRecentProjects() {
	return function (dispatch) {
		return axios
			.post(config.apiUrl + "get_projects/", {"published":false,"limit":4,"order":"desc"})
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
		type: 'HOME_RECENT_PROJECTS_RECEIVED',
		error
	}
}
