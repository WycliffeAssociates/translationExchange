export default function reducer(state = {}, action) {
	switch (action.type) {
		case "HOME_RECENT_PROJECTS_ERR":
			return { ...state, error: action.payload };
		case "HOME_RECENT_PROJECTS_RECEIVED":
			return {
				...state,
				home_recent_projects: action.payload
			};
		default:
			return state;
	}
}
