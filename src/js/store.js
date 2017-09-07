import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducers/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = composeWithDevTools(applyMiddleware(thunk, logger));
export default createStore(reducer, middleware);
