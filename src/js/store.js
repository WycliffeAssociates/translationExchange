import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducers/reducer";
import LogRocket from 'logrocket';

import { composeWithDevTools } from "redux-devtools-extension";
const middleware = composeWithDevTools(applyMiddleware(thunk, logger, LogRocket.reduxMiddleware()));
export default createStore(reducer, middleware);
