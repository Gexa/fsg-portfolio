import * as React from 'react';

import styles from '../../../assets/scss/components/UI/Button.module.scss';

export type ButtonProps = {
    caption?: any;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    classes?: any;
    icon?: JSX.Element;
    iconGroup?: 'fas' | 'fab';
    onClick?: any
};

const Button: React.FunctionComponent<ButtonProps> = (props?: ButtonProps): JSX.Element => {
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
        <button data-test="component-button"
                type={!props.type ? 'button' : props.type}
                className={combinedClasses.join(' ')}
                disabled={props.disabled ? props.disabled : false}
                onClick={props.onClick && props.onClick}>
            {props.icon && props.icon}
            {props.caption && <span>{props.caption}</span>}
        </button>
    );
}

export default Button;