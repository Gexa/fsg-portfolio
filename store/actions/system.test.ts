import { Message } from "../../lib/types/system";
import systemReducer from "../reducers/system";
import { systemSetMessage, systemClearMessage, systemSetLoading, systemSetTheme } from './system';
import * as actionTypes from './actionTypes';

describe('System reducer', () => {
    it('should set system message and return properly', () => {
        const msg:Message = {
            title: 'Test msg',
            content: 'testing',
            buttons: null,
            backdrop: false
        };

        const actionResult = systemSetMessage(msg);

        expect(actionResult).toEqual({
            type: actionTypes.SYSTEM_SET_MESSAGE,
            payload: msg
        });
    });

    it('should clear system message and return the type SYSTEM_CLEAR_MESSAGE', () => {
        const actionResult = systemClearMessage();

        expect(actionResult).toEqual({
            type: actionTypes.SYSTEM_CLEAR_MESSAGE
        });
    });

    it('should set system loading state to true', () => {
        const actionResult = systemSetLoading(true);

        expect(actionResult).toEqual({
            type: actionTypes.SYSTEM_SET_LOADING,
            payload: true
        });
    });

    it('should set system theme to light', () => {
        const actionResult = systemSetTheme('light');

        expect(actionResult).toEqual({
            type: actionTypes.SYSTEM_SET_THEME,
            payload: 'light'
        });
    });
});