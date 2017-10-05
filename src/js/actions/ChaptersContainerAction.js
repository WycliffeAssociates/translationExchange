import axios from "axios";
import config from "../../config/config";
import QueryString from "query-string";

//chaptersContainer

export const fetchChaptersContainerData = (query) => {
    return function (dispatch) {
        return axios
            .post(config.apiUrl + "get_chapters/", query)
            .then(response => {
                dispatch(fetchChaptersContainerDataSuccess(response.data));
            })
            .catch(err => {
                dispatch(fetchChaptersContainerDataFailed(err));
            });
    };
}

export function fetchChaptersContainerDataSuccess(response) {
    return {
        type: 'FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS',
        response,
        chapters: response.chapters,
        book: response.book,
        project_id: response.project_id,
        is_publish: response.is_publish,
        language: response.language,
        loaded: true
    }
}
export function fetchChaptersContainerDataFailed(error) {
    return {
        type: 'FETCH_CHAPTERS_CONTAINER_DATA_FAILED',
        error
    }
};

//set checking level
export function setCheckingLevel(chapterId, level) {

    return function (dispatch) {
        return axios
            .patch(config.apiUrl + "chapters/" + chapterId + "/", { checked_level: level })
            .then(response => {
                dispatch(dispatchSetCheckingLevelSuccess(response.data));
            })
            .catch(err => {
                dispatch(dispatchSetCheckingLevelFailed(err));
            });
    };
}

export function dispatchSetCheckingLevelSuccess(response) {
    return {
        type: 'SET_CHECKING_LEVEL_SUCCESS',
        response
    }
}
export function dispatchSetCheckingLevelFailed(error) {
    return {
        type: 'SET_CHECKING_LEVEL_FAILED',
        error
    }
}

//publish files
export function publishFiles(chapterId) {

    return function (dispatch) {
        return axios
            .patch(config.apiUrl + "projects/" + chapterId + "/", { is_publish: true })
            .then(response => {
                dispatch(dispatchPublishFilesSuccess(response.data));
            })
            .catch(err => {
                dispatch(dispatchPublishFilesFailed(err));
            });
    };
}
export function dispatchPublishFilesSuccess(response) {
    return {
        type: 'PUBLISH_FILES_SUCCESS',
        response,
        is_publish: true
    }
}
export function dispatchPublishFilesFailed(error) {
    return {
        type: 'PUBLISH_FILES_FAILED',
        error
    }
}

//download project
export function downloadProject(projectId) {

    return function (dispatch) {
        return axios
            .post(config.apiUrl + "zip_files/", { project: projectId }, { timeout: 0 })
            .then(response => {
                dispatch(dispatchdownloadProjectSuccess(response.data));
            })
            .catch(err => {
                dispatch(dispatchdownloadProjectFailed(err));
            }).catch(exception=>{
                dispatchdownloadProjectException(exception);
            });
    };
}
export function dispatchdownloadProjectSuccess(response) {
    return {
        type: 'DOWNLOAD_PROJECT_SUCCESS',
        response,
        downloadLoading: false,
        downloadSuccess: "Success. Check your downloads folder"
    }
}
export function dispatchdownloadProjectFailed(error) {
    return {
        type: 'DOWNLOAD_PROJECT_FAILED',
        downloadLoading: false,
        downloadError: error
    }
}
export function dispatchdownloadProjectException(exception) {
    return {
        type: 'DOWNLOAD_PROJECT_EXCEPTION',
        downloadError: exception
    }
}