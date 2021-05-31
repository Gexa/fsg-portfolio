import React from 'react';
import 'jsdom-global/register';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

global.localStorage = {
    getItem: jest.fn(),
    length: 1,
    clear: jest.fn(),
    key: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
}

global.sessionStorage = {
    getItem: jest.fn(),
    length: 1,
    clear: jest.fn(),
    key: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
}

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span />
}));

type ReCapthaProps = {
    size?: any;
    onChange?: any;
};

jest.mock('react-google-recaptcha', () => {
    const ReCAPTCHA:React.FC<ReCapthaProps> = React.forwardRef<HTMLInputElement, ReCapthaProps>((props, ref) => {
        return (
            <input
                type='checkbox'
                data-test-id="recaptcha"
                className={props.size}
                onChange={props.onChange}
                ref={ref}
            />
        )
    });

    return ReCAPTCHA;
});