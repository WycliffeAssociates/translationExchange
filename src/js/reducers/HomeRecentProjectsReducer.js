export default function reducer(state = [], action) {
	switch (action.type) {
		case "HOME_RECENT_PROJECTS_ERR":
			return state;
		case "HOME_RECENT_PROJECTS_RECEIVED":
			//repalce current state with new state and limit array to <=4
			return [...action.payload.splice(0, 4)];
		default:
			return state;
	}
}
