import axios from "axios";
import config from "../../config/config";
import QueryString from "query-string";

export function fetchRecentProjects() {
	return function (dispatch) {
		return axios
			.post(config.apiUrl + "get_projects/", {})
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
