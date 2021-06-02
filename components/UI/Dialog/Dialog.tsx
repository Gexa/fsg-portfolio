import * as React from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import { Message } from '../../../lib/types/system';

import styles from '../../../assets/scss/components/UI/Dialog.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Dialog = (props: Message) => {

    const customStyles = [];
    const buttons = props.buttons && props.buttons.map( (buttonProps, index) => <Button key={index} {...buttonProps} /> );

    const handleClose = () => {
        props.onClose && props.onClose();
    }

    const closeBtn = props.closeable === true ?
                    <button className={styles.dialogClose} onClick={handleClose} >
                            <FontAwesomeIcon icon={['fas', 'times']} />
                    </button> :
                    null;

    const children = (
        <div data-test="component-dialog" className={[styles.dialog, ...customStyles].join(' ')}>
            {props.backdrop && props.backdrop === true  ? <div data-test="component-ui-backdrop" onClick={handleClose} className={styles.backdrop}></div> : null}
            <section className={styles.dialogBody}>
                {props.title && <header className={styles.dialogTitle}>{props.title}<span>{closeBtn}</span></header>}

                <div className={styles.dialogContent}>
                    {props.content}
                </div>

                {buttons && <footer className={styles.dialogFooter}>{buttons}</footer>}
            </section>
        </div>
    );

    return createPortal(children, document.getElementById("portal"));
}

export default Dialog;