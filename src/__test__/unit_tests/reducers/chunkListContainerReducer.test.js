//import ChunkContainerReducer from '../../js/reducers/ChunkListContainerReducer';
import ChunkContainerReducer from '../../../js/reducers/ChunkListContainerReducer';

describe('ChunkContainerReducer', () => {
    const INITIAL_STATE = {
        loaded: false,
        error: "",
        chunks: [],
        comments: [],
        takes: [],
        project: {},
        book: {},
        chapter: {},
        language: {},
        active: false,
        selectedSourceProjectQuery: -1,
        selectedSourceProject: {},
        notifyFlag: false,
        update: false,
        chapterId:''
    };

    it('should have initial state', () => {
        expect(ChunkContainerReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('should change the state', () => {
        expect(ChunkContainerReducer({}, { type: "FETCH_TAKES_SUCCESS" })).not.toEqual(INITIAL_STATE);
    });
    it('should change the state', () => {
        expect(ChunkContainerReducer({}, { type: "FETCH_TAKES_FAILED",error:"Error Found." })).toEqual({});
    });

})
