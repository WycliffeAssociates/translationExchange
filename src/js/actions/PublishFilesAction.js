import axios from "axios";
import config from "../../config/config";

export function publishFiles(chapterId) {
	return function (dispatch) {
		return axios
			.patch(config.apiUrl + "projects/" + chapterId +"/", {is_publish: true})
			.then(response => {
				dispatch(publishFilesSuccess(response.data));
			})
			.catch(err => {
				dispatch(publishFilesErr(err));
			});
	};
}

export function publishFilesSuccess(response) {
	return {
		type: 'PUBLISH_FILES_SUCCESS',
		response
	}
}
export function publishFilesErr(error) {
	return {
		type: 'PUBLISH_FILES_FAILED',
		error
	}
}