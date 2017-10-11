const INITIAL_STATE = {
	homeRecentProjects: []
};


export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "HOME_RECENT_PROJECTS_ERR":
			return state;
		case "HOME_RECENT_PROJECTS_RECEIVED":
			//repalce current state with new state and limit array to <=4
			if (action.response && action.response.length > 0) {
				return {
					homeRecentProjects: [...action.response.splice(0, 4)]
				}
			}
			break;
		default:
			return state;
	}
}
