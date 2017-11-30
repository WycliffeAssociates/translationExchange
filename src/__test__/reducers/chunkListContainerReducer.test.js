import ChunkContainerReducer from '../../js/reducers/ChunkListContainerReducer';

describe('ChunkContainerReducer', () => {
    const INITIAL_STATE = {
        loaded: false,
        error: "",
        chunks: [],
        project: {},
        book: {},
        chapter: {},
        language: {},
        active: false
    };

    it('should have initial state', () => {
        expect(ChunkContainerReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('should change the state', () => {
        expect(ChunkContainerReducer({}, { type: "FETCH_TAKES_SUCCESS" })).not.toEqual(INITIAL_STATE);
    });
    it('should change the state', () => {
        expect(ChunkContainerReducer({}, { type: "FETCH_TAKES_FAILED",error:"Error Found." })).toEqual({"error":"Error Found."});
    });

})