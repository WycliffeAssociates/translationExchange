import axios from "axios";
import config from "../../config/config";

export function downloadProject(projectId) {
    return function (dispatch) {
        return axios
            .post(config.apiUrl + "zip_files/", { project: projectId }, { timeout: 0 })
            .then(response => {
                dispatch(downloadProjectSuccess(response.data));
            })
            .catch(err => {
                dispatch(downloadProjectFailed(err));
            }).catch(exception => {
                dispatch(downloadProjectException(exception));
            });
    };
}

export function downloadProjectSuccess(response) {
    return {
        type: 'DOWNLOAD_PROJECT_SUCCESS',
        downloading: false,
        downloadSucess: "Success. Check your downloads folder"
    }
}
export function downloadProjectFailed(error) {
    return {
        type: 'DOWNLOAD_PROJECT_FAILED',
        error
    }

}
export function downloadProjectException(ex) {
    return {
        type: 'DOWNLOAD_PROJECT_EXCEPTION',
        ex
    }
}