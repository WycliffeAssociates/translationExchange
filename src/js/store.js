import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducers/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import {loadState, saveState} from './localState';
const middleware = composeWithDevTools(applyMiddleware(thunk, logger));

const persistedState = loadState();
const store = createStore(reducer, persistedState, middleware);
console.log(store.getState().kanbanPage, 'THE STATE OF THE KANBAN PAGE');
console.log(persistedState, 'THE STATE OF THE PERSISTED PAGE');
store.subscribe(() => {
  saveState({kanbanPage: store.getState().kanbanPage});
});
export default store;
