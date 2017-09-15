import axios from "axios";
import config from "../../config/config";
import QueryString from "query-string";

export function fetchRecentProjects() {
	return function(dispatch) {
		return axios
			.post(config.apiUrl + "all_projects/", {})
			.then(response => {
				dispatch({
					type: "HOME_RECENT_PROJECTS_RECEIVED",
					payload: response.data
				});
			})
			.catch(err => {
				dispatch({ type: "HOME_RECENT_PROJECTS_ERR", payload: err });
			});
	};
}
