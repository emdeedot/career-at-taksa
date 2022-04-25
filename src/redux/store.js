import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import initialState from "./initialState";

const loggerMiddleware = createLogger();

const configureStore = () => {
  const middlewares = process.env.NODE_ENV === "production" ? [thunkMiddleware] : [thunkMiddleware, loggerMiddleware];
  const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const enhancers = [middlewareEnhancer];

  const composedEnhancers = compose(...enhancers);

  const store = createStore(reducer, initialState, composedEnhancers);
  return store;
};

export default configureStore;
