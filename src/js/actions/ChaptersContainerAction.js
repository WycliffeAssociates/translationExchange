import axios from "axios";
import config from "../../config/config";

//chaptersContainer

export const fetchChaptersContainerData = (query) => {
    return function (dispatch) {
        return axios
            .all([
                axios.get(`${config.apiUrl}chapters/?project_id=${query.project_id}`),
                axios.get(`${config.apiUrl}languages/?slug=${query.lang}`),
                axios.get(`${config.apiUrl}books/?slug=${query.book}`),
                axios.get(`${config.apiUrl}versions/?project_id=${query.project_id}`),

            ])
            .then(
            axios.spread(function (
                chaptersResponse,
                languagesResponse,
                booksResponse,
                versionsResponse
            ) {
                dispatch(fetchChaptersContainerDataSuccess(chaptersResponse.data, languagesResponse.data, booksResponse.data, versionsResponse.data, query.project_id, query.published));
            })
            )
            .catch(err => {
                dispatch(fetchChaptersContainerDataFailed(err));
            });
    };
}



export function fetchChaptersContainerDataSuccess(chapters, language, book, version, project_id, published) {
    return {
        type: 'FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS',
        language: language[0],
        version: version[0],
        book: book[0],
        project_id,
        published,
        chapters,
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
        checked_level:response.checked_level
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
            .patch(config.apiUrl + "projects/" + chapterId + "/", { publish: true })
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
export function downloadProject(projectId, file_format) {

    return function (dispatch) {
        dispatch(dispatchLoadingDownloadProject());
        return axios
            .get(config.apiUrl + `zip/?id=${projectId}&file_format=${file_format}`)
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
            .get(config.apiUrl + `tr/?id=${projectId}&published=true`)
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
