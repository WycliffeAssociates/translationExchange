import axios from "axios";
import config from "../../config/config";

export const  fetchAllProjects= (query,queryString) => {
    console.log("Here");
    return function (dispatch) {
        dispatch(dispatchAllProjectsLoading());
		return axios
			.post(config.apiUrl + "all_projects/", query)
			.then(response => {
				dispatch(dispatchAllProjectsReceived(response.data,queryString));
			})
			.catch(err => {
				dispatch(dispatchAllProjectsFailed(err));
			});
	};
};

export const dispatchAllProjectsReceived=(response,queryString)=>{
    return{
        type:"ALL_PROJECTS_SUCCESS",
        response,
        queryString
    }
}
export const dispatchAllProjectsFailed=err=>{
    return{
        type:"ALL_PROJECTS_FAILED",
        err
    }
}
export const dispatchAllProjectsLoading=()=>{
    return{
        type:"ALL_PROJECTS_LOADING",
    }
}
export const dispatchAllProjectsReset=()=>{
    return{
        type:"ALL_PROJECTS_RESET",
    }
}