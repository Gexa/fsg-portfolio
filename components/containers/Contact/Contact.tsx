import * as React from 'react';
import Link from 'next/link';

import useComponentVisible from '../../../lib/hooks/useComponentVisible';
import styles from '../../../assets/scss/components/Contact.module.scss';
import Button, { ButtonProps } from '../../UI/Button/Button';

const Contact: React.FunctionComponent = (): JSX.Element => {

    const [ contactData, setContactData ] = React.useState({ subject: '', sender: '', message: '', terms: false });
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const handleSubmit = event => {
        event.preventDefault();
        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify({
                ...contactData
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then( response => response.json() )
        .then( data => {
            console.log(data);
        }).catch( error => {
            alert(error.message);
        });

    }

    const handleChange = (event, formField) => {
        setContactData( oldData => ({
            ...oldData,
            [formField]: (formField !== 'terms' ? event.target.value : event.target.checked)
        }));
    }

    const handleFormShow = (event) => {
        event.preventDefault();
        setIsComponentVisible(true);
    }

    const sendBtnProps:ButtonProps = {
        classes: ['primary', 'uppercase', 'lg'],
        type: 'submit'
    };

    return (
        <form method="POST"
            ref={ref}
            onSubmit={handleSubmit}
            className={styles.contactForm}
            data-test="component-contact">
                {isComponentVisible ?
                (<>
                    <input type="text" autoFocus placeholder="Subject" autoComplete="off" className={styles.input} value={contactData.subject} onChange={e => handleChange(e, 'subject')} />
                    <input type="email" placeholder="Contact E-mail" className={styles.input} value={contactData.sender} onChange={e => handleChange(e, 'sender')} />
                    <textarea className={styles.message} autoComplete="off"
                            placeholder="Write your message here! Your message should be at least 20 characters long."
                            onChange={e => handleChange(e, 'message')}
                            value={contactData.message}></textarea>
                    <div className={styles.toolbar}>

                        <label htmlFor="acceptTerms">
                            <input type="checkbox"
                                    id="acceptTerms"
                                    value="1"
                                    checked={contactData.terms}
                                    onChange={e => handleChange(e, 'terms')}
                                    className={styles.checkbox} />
                            I've read and understand the <Link href="/policy">Privacy Policy</Link>
                        </label>

                        <Button disabled={!contactData.terms} {...sendBtnProps}>Send</Button>
                    </div>
                </>
                )
                :
                (<p onClick={handleFormShow}>
                    Leave a message, and tell us, how can we help you!? We will contact you ASAP, within 1-2 business days. <em><small>(Click here to write...)</small></em>
                </p>)}
        </form>
    );
}

export default Contact;