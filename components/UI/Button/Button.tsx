import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../../assets/scss/components/UI/Button.module.scss';
import { IconName } from '@fortawesome/fontawesome-svg-core';

export type ButtonProps = {
    children: string | JSX.Element;
    type?: 'button' | 'submit' | 'reset';
    className?: string[] | string;
    icon?: IconName;
    iconGroup?: 'fas' | 'fab';
    MouseEvents?: object;
};

const Button: React.FunctionComponent = (props?: ButtonProps): JSX.Element => {
    let recievedClassNames = [];
    if (!props.className) {
        recievedClassNames.push(styles.primary);
    } else {
        if (typeof props.className !== 'string') {
            recievedClassNames = props.className.map(className => styles[className]);
        } else {
            recievedClassNames.push(styles[props.className]);
        }
    }

    return (
        <button type={!props.type ? 'button' : props.type}
                data-test="component-button"
                className={[styles.btn].concat(recievedClassNames).join(' ')}
                {...props.MouseEvents}>
            {props.icon && <FontAwesomeIcon icon={[props.iconGroup, props.icon]} />}
            <span>{props.children}</span>
        </button>
    );
}

export default Button;