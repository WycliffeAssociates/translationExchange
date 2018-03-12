import axios from "axios";
import config from "../../config/config";

export const fetchAllSourceAudio = (setInitialSourceAudio) => {
    return function (dispatch) {
        dispatch(dispatchSourceAudioLoading());
        return axios
            .get(config.apiUrl + `projects/?published=true`,{
                headers: { Authorization: "Token " + localStorage.getItem('token') }
            })
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
                  return null; // added to satisfy warning of return expected on arrow function
                });
                // setInitialSourceAudio(projects[0].value);
                dispatch(dispatchSourceAudioReceived(projects));

            })
            .catch(err => {

                dispatch(dispatchSourceAudioFailed(err));
            });
    };
};

export const getSourceTakes = (chunkId, playSourceTake, chunkNumber) => {
  return function(dispatch) {
    return axios
      .get(`${config.apiUrl}takes/?chunk_id=${chunkId}`,{
        headers: { Authorization: "Token " + localStorage.getItem('token') }
    })
      .then(response => {
           playSourceTake(response.data[0].location, chunkId, chunkNumber);
      })
      .catch(error => {
        //dispatch(dispatchChunksFailed(error));
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
