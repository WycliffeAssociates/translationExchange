//import reducer from '../../js/reducers/HomeRecentProjectsReducer';
import reducer from '../../../js/reducers/HomeRecentProjectsReducer';
describe('Home Recent Project Reducer', () => {

    it('should return initial state', () => {
        const INITIAL_STATE = {
            homeRecentProjects: [], error: ''
        };
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('should output the given error', () => {
        expect(reducer({},
            {
                type: "HOME_RECENT_PROJECTS_ERR",
                error: "Some Error"
            }))
            .toEqual({ error: "Some Error" });
    });
});
