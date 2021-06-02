import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import systemReducer from '../../store/reducers/system';

export const findByTestAttr = (wrapper, testId) => {
    return wrapper.find(`[data-test="${testId}"]`);
}

export const storeFactory = () => {
    const rootReducer = combineReducers({ system: systemReducer });
    return createStore(rootReducer, compose(applyMiddleware(ReduxThunk)));
}