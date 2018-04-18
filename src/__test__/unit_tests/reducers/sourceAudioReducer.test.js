import reducer from '../../../js/reducers/SourceAudioReducer';


describe('SourceAudioReducer', () => {
    const INITIAL_STATE = {
        loaded: false,
        error: "",
        projects: []
    };
    it('should return initial state...', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('should change the state of loaded and products', () => {
        expect(reducer({}, { type: "SOURCE_AUDIO_SUCCESS", projects: [1, 2, 3, 4, 5] })).toEqual({ loaded: true, projects: [1, 2, 3, 4, 5] });
    });
    it('should have error message', () => {
        expect(reducer({}, { type: "SOURCE_AUDIO_FAILED", err: "The error message" })).toEqual({ error: "The error message","loaded":true });
    });
});
