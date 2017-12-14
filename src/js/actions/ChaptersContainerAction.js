import axios from "axios";
import config from "../../config/config";

//chaptersContainer

export const fetchChaptersContainerData = (query) => {
    return function (dispatch) {
        console.log(query)
        return axios
            .get(config.apiUrl + `chapters/?project_id=${query.project_id}&published=${query.published}`)
            .then(response => {
                dispatch(fetchChaptersContainerDataSuccess(response.data));
            })
            .catch(err => {
                dispatch(fetchChaptersContainerDataFailed(err));
            });
    };
}

export function fetchChaptersContainerDataSuccess(response) {
    response =
        {
            project_id: 1,
            published: false,
            //slug
            language: "yolo",
            version: "ulb",
            book: "Genesis",
            chapters: [
                {
                    "id": 1,
                    "number": 1,
                    "checked_level": 0,
                    "published": false,
                    "project": 1,
                    "date_modified": "2017-12-14T15:01:49.577746Z",
                    "contributor": "Philip"
                },
                {
                    "id": 2,
                    "number": 2,
                    "checked_level": 0,
                    "published": false,
                    "project": 1,
                    "date_modified": "2017-02-14T15:01:49.577746Z",
                    "contributor": "Silas"
                }
            ],
        }

    return {
        type: 'FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS',
        project_id: response.project_id,
        published: response.published,
        language: response.language,
        version: response.version,
        book: response.book,
        chapters: response.chapters,
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
            .patch(config.apiUrl + "projects/" + chapterId + "/", { published: true })
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
            .get(config.apiUrl + `zip/?id=${projectId}`)
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
            .post(config.apiUrl + "get_source/", { project_id: projectId, published: true }, { timeout: 0 })
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
