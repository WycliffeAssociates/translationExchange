
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getAudioTakes, getAudioComments, setSourceProject, getSelectedProjectInfo } from '../../js/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('chunkListContainerActions', () => {
    const store = mockStore();
    it('has action type: FETCH_TAKE_SUCCESS_FIRST_TIME and response is not undefined', () => {
        const expectedActions = [
            { type: 'FETCH_TAKE_SUCCESS_FIRST_TIME' }
        ];
        const store = mockStore({ takes: [] });
        const chunkId = 1;
        const counter =0;
        return store.dispatch(getAudioTakes(chunkId, counter)).then(() => {
            let action = store.getActions()[0];

            expect(action.type).toEqual(expectedActions[0].type);      //
            expect(action.takes).not.toBeUndefined();
        })
    });
    it('has action type: FETCH_TAKE_SUCCESS and response is not undefined', () => {
        const expectedActions = [
            { type: 'FETCH_TAKE_SUCCESS' }
        ];
        const store = mockStore({ takes: [] });
        const chunkId = 1;
        const counter =1;
        return store.dispatch(getAudioTakes(chunkId, counter)).then(() => {
            let action = store.getActions()[0];

            expect(action.type).toEqual(expectedActions[0].type);
            expect(action.response).toBeUndefined();
        })
    });


    it('has action type: GET_COMMENTS_SUCCESS and response is not undefined', () => {
        const expectedActions = [
            { type: 'GET_COMMENTS_SUCCESS' }
        ];
        const store = mockStore({ comments: [] });
        const chapterId = 1;
        const type ='chapter_id';
        return store.dispatch(getAudioComments(chapterId, type)).then(() => {
            let action = store.getActions()[0];


            expect(action.type).toEqual(expectedActions[0].type);
            expect(action.comments).not.toBeUndefined();

        })
    });


    it('has action type: FETCH_PROJECT_SUCCESS and response is not undefined', () => {
        const expectedActions = [
            { type: 'FETCH_PROJECT_SUCCESS' }
        ];
        const store = mockStore({ project: [] });
        const query = {book: "mat", chapterId: "3", chapter_num: "1", lang: "aaa", language: "ghotuo", project_id:"2",published:"false",version:"ulb" }
        return store.dispatch(getSelectedProjectInfo(query)).then(() => {
            let action = store.getActions()[0];
            expect(action.type).toEqual(expectedActions[0].type);
            expect(action.project).not.toBeUndefined();
            expect(action.chapter).not.toBeUndefined();
            expect(action.chunks).not.toBeUndefined();


        })
    });


    it('Checks the content received for takes is the expected ', () => {
        const expectedActions = [
            { type: 'FETCH_TAKE_SUCCESS_FIRST_TIME' }
        ];
        const store = mockStore({ takes: [] });
        const chunkId = 1;
        const counter =0;
        return store.dispatch(getAudioTakes(chunkId, counter)).then(() => {
            let action = store.getActions()[0];
            const{id, location, duration, rating, published,
                  markers, date_modified, chunk, chunk_modified} = action.takes[0];

            expect(typeof(id)).toEqual('number');
            expect(typeof(location)).toEqual('string');
            expect(typeof(duration)).toEqual('number');
            expect(typeof(rating)).toEqual('number');
            expect(typeof(published)).toEqual('boolean');
            expect(typeof(markers)).toEqual('string');
            expect(typeof(date_modified)).toEqual('string');
            expect(typeof(chunk)).toEqual('number');
            expect(typeof(chunkId)).toEqual('number');
        })
    });



});
