import axios from "axios";
import config from "../../config/config";

export const fetchAllSourceAudio = (projectId, setInitialSourceAudio) => {
    return function (dispatch) {
        dispatch(dispatchSourceAudioLoading());
        return axios
            .get(config.apiUrl + `projects/?id=${projectId}&published=true`)
            .then(response => {
                let projects = [];
                response.data.map(project => {
                    let projectQuery = {
                        language: project.language.slug,
                        book: project.book.slug,
                        version: project.version
                    };
                    projects.push({
                        key: project.id,
                        value: projectQuery,
                        text: project.language.name + " (" + project.version.slug + ")"
                    });
                });
                setInitialSourceAudio(projects[0].value);
                dispatch(dispatchSourceAudioReceived(projects));

            })
            .catch(err => {
                dispatch(dispatchSourceAudioFailed(err));
            });
    };
};

export const dispatchSourceAudioReceived = (projects) => {
    return {
        type: "SOURCE_AUDIO_SUCCESS",
        projects
    }
}
export const dispatchSourceAudioFailed = err => {
    return {
        type: "SOURCE_AUDIO_FAILED",
        err
    }
}
export const dispatchSourceAudioLoading = () => {
    return {
        type: "SOURCE_AUDIO_LOADING",
    }
}
