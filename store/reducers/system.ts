import * as actionTypes from '../actions/actionTypes';
import { SystemState } from '../../lib/interfaces/system';

const isServer = typeof window === 'undefined';

const initialState:SystemState = {
    message: null,
    theme: !isServer && localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark',
    loading: false
}

const setTheme = ( newTheme, currentState ) => {
    if (!currentState || !currentState.cookiesEnabled) {
        return currentState.theme;
    }
    localStorage.setItem('theme' , newTheme);
    document.body.classList.remove(currentState.theme);
    document.body.classList.add(newTheme);
    return newTheme;
}


const systemReducer = (state:SystemState = initialState, action) => {
    switch (action.type) {
        case actionTypes.SYSTEM_SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            };
        case actionTypes.SYSTEM_SET_MESSAGE:
            return { ...state, message: null };
        case actionTypes.SYSTEM_SET_LOADING:
            return { ...state, loading: action.payload };
        case actionTypes.SYSTEM_SET_LOADING:
            return { ...state, theme: setTheme(action.payload, state) };
        default:
            return state;
    }
}

export default systemReducer;