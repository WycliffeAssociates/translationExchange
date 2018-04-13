// /* global describe it expect */
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { fetchChaptersContainerData } from '../../js/actions';
//
//
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// localStorage.setItem('token', '9e2afaaf7efbf5cfb76a038bd918280387763409');
//
// describe('ChaptersContainerAction', () => {
//   const store = mockStore();
//   it('has action type:FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS and response is not undefined', () => {
//     const expectedActions = [
//       { type: 'FETCH_CHAPTERS_CONTAINER_DATA_SUCCESS' },
//     ];
//     const store = mockStore({ chapters: [] });
//     let query = { project_id: 1, lang: 'eng', book: 'gen' };
//     return store.dispatch(fetchChaptersContainerData(query)).then(() => {
//       let action = store.getActions()[0];
//       expect(action.type).toEqual(expectedActions[0].type);
//       expect(action.chapters).not.toBeUndefined();
//     });
//   });
// //   it('has action type:FETCH_CHAPTERS_CONTAINER_DATA_FAILED and response is not undefined', () => {
// //     const expectedActions = [
// //       { type: 'FETCH_CHAPTERS_CONTAINER_DATA_FAILED' },
// //     ];
// //     const store = mockStore({ projects: [] });
// //     return store.dispatch(fetchChaptersContainerData({})).then(() => {
// //       let action = store.getActions()[0];
// //       expect(action.type).toEqual(expectedActions[0].type);
// //       expect(action.response).toBeUndefined();
// //     });
// //   });
// });
