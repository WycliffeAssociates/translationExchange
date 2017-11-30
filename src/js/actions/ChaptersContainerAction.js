import axios from "axios";
import config from "../../config/config";

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
        chapters: response.chapters,
        version:response.version,
        book: response.book,
        project_id: response.project_id,
        published: response.published,
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
        response
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
        dispatch(dispatchLoadingDownloadProject());
        return axios
            .post(config.apiUrl + "zip_project_files/", { project_id: projectId }, { timeout: 0 })
            .then(response => {
                //Todo: find the better way to download files
                window.location = config.streamingUrl + response.data.location;
                dispatch(dispatchdownloadProjectSuccess(response.data));
            })
            .catch(err => {
                dispatch(dispatchdownloadProjectFailed(err));
            }).catch(exception => {
                dispatchdownloadProjectException(exception);
            });
    };
}
export function dispatchLoadingDownloadProject() {
    return {
        type: 'DOWNLOAD_PROJECT'
    }
}
export function dispatchdownloadProjectSuccess(response) {
    return {
        type: 'DOWNLOAD_PROJECT_SUCCESS',
        response
    }
}
export function dispatchdownloadProjectFailed(error) {
    return {
        type: 'DOWNLOAD_PROJECT_FAILED',
        error
    }
}
export function dispatchdownloadProjectException(exception) {
    return {
        type: 'DOWNLOAD_PROJECT_EXCEPTION',
        downloadError: exception
    }
}
//download source audio
export function downloadSourceAudio(projectId) {
    return function (dispatch) {
        dispatch(dispatchLoadingDownloadSourceAudio());
        return axios
            .post(config.apiUrl + "get_source/", { project_id: projectId,published:true }, { timeout: 0 })
            .then(response => {
                //Todo: find the better way to download files
                window.location = config.streamingUrl + response.data.location;
                dispatch(dispatchDownloadSourceAudioSuccess(response.data));
            })
            .catch(err => {
                dispatch(dispatchDownloadSourceAudioFailed(err));
            });
    };
}
export function dispatchLoadingDownloadSourceAudio() {
    return {
        type: 'DOWNLOAD_SOURCE_AUDIO'
    }
}
export function dispatchDownloadSourceAudioSuccess(response) {
    return {
        type: 'DOWNLOAD_SOURCE_AUDIO_SUCCESS',
        response
    }
}
export function dispatchDownloadSourceAudioFailed(error) {
    return {
        type: 'DOWNLOAD_SOURCE_AUDIO_SUCCESS_FAILED',
        error
    }
}
