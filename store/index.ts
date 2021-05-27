import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import system from "./reducers/system";

const rootReducer = combineReducers({ system });

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;