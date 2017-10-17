import axios from "axios";
import config from "../../config/config";

export const fetchAllSourceAudio = (book, projectId, setInitialSourceAudio) => {
    return function (dispatch) {
        dispatch(dispatchSourceAudioLoading());
        return axios
            .post(config.apiUrl + "all_projects/", { is_publish: true, book: book })
            .then(response => {
                let projects = [];
                response.data.map(project => {
                    let projectQuery = {
                        language: project.language.slug,
                        book: project.book.slug,
                        version: project.version
                    };
                    if (project.id !== projectId) {
                        projects.push({
                            key: project.id,
                            value: projectQuery,
                            text: project.language.name + " (" + project.version + ")"
                        });
                    }
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
