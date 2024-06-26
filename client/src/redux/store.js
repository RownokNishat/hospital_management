import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from "./rootreducer";
import { logger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer, 
    // composeEnhancers(applyMiddleware(logger, thunkMiddleware))
    )

export default store;