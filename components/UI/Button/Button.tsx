import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../../assets/scss/components/UI/Button.module.scss';
import { IconName } from '@fortawesome/fontawesome-svg-core';

export type ButtonProps = {
    children?: any;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    classes?: any;
    icon?: IconName;
    iconGroup?: 'fas' | 'fab';
    MouseEvents?: object;
};

const Button: React.FunctionComponent = (props?: ButtonProps): JSX.Element => {
    let recievedClassNames = [];
    if (!props.classes) {
        recievedClassNames.push(styles.primary);
    } else {
        if (typeof props.classes !== 'string') {
            recievedClassNames = props.classes.map(className => styles[className]);
        } else {
            recievedClassNames.push(styles[props.classes]);
        }
    }
    const combinedClasses = [styles.btn, ...recievedClassNames];

    return (
        <button type={!props.type ? 'button' : props.type}
                data-test="component-button"
                className={combinedClasses.join(' ')}
                disabled={props.disabled ? props.disabled : false}
                {...props.MouseEvents}>
            {props.icon && <FontAwesomeIcon icon={[props.iconGroup, props.icon]} />}
            <span>{props.children}</span>
        </button>
    );
}

export default Button;