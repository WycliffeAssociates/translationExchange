const INITIAL_STATE = { homeRecentProjects:[]
                      };


export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "HOME_RECENT_PROJECTS_ERR":
			return state;
		case "HOME_RECENT_PROJECTS_RECEIVED":
			return {
        ...state,homeRecentProjects : action.response}
		default:
			return state;
	}
}
