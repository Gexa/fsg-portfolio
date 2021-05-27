import * as actionTypes from './actionTypes';
import { Message } from "../../lib/types/system";


export const systemSetMessage = (message: Message): object => {
    return {
        type: actionTypes.SYSTEM_SET_MESSAGE,
        payload: message
    };
}

export const systemClearMessage = (): object => {
    return {
        type: actionTypes.SYSTEM_CLEAR_MESSAGE
    };
}

export const systemSetLoading = (loading: boolean = false): object => {
    return {
        type: actionTypes.SYSTEM_SET_LOADING,
        payload: loading
    };
}

export const systemSetTheme = (theme: string = 'dark'): object => {
    return {
        type: actionTypes.SYSTEM_SET_THEME,
        payload: theme
    }
}