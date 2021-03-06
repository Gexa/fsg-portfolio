import * as React from 'react';
import { useDispatch } from 'react-redux';

import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';

import Button, { ButtonProps } from '../../UI/Button/Button';
import useComponentVisible from '../../../lib/hooks/useComponentVisible';

import { systemClearMessage, systemSetMessage } from '../../../store/actions/system';

import styles from '../../../assets/scss/components/Contact.module.scss';

const Contact: React.FunctionComponent = (): JSX.Element => {

    const [ contactData, setContactData ] = React.useState({ subject: '', sender: '', message: '', terms: false, verify: '' });
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const dispatch = useDispatch();

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
        })
        .then( response => response.json() )
        .then( data => {

            dispatch(systemSetMessage({
                title: 'Contact',
                content: data.message,
                buttons: [
                    {
                        caption: 'Close',
                        classes: ['danger'],
                        icon: 'times',
                        onClick: () => dispatch(systemClearMessage())
                    }
                ],
                closeable: true,
            }));

            setContactData({
                subject: '',
                sender: '',
                message: '',
                terms: false,
                verify: ''
            });

            setIsComponentVisible(false);

        }).catch( error => {
            dispatch(systemSetMessage({
                title: 'Mail sending error',
                content: error.message,
                buttons: [
                    {
                        caption: 'Close',
                        classes: ['danger'],
                        icon: 'times',
                        onClick: () => dispatch(systemClearMessage())
                    }
                ],
                closeable: true,
            }));
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
        setContactData( oldData => ({
            ...oldData,
            terms: false,
            verify: ''
        }));
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
                    <input type="text"
                            autoFocus
                            placeholder="Subject"
                            autoComplete="off"
                            className={styles.input}
                            value={contactData.subject}
                            onChange={e => handleChange(e, 'subject')}
                        />

                    <input type="email"
                            required={true}
                            placeholder="Contact E-mail"
                            className={styles.input}
                            value={contactData.sender}
                            onChange={e => handleChange(e, 'sender')}
                        />

                    <div className={styles.withRecaptcha}>
                        <textarea className={styles.message}
                            autoComplete="off"
                            required={true}
                            placeholder="Write your message here! Your message should be at least 20 characters long."
                            onChange={e => handleChange(e, 'message')}
                            value={contactData.message}></textarea>

                        <div className={styles.captcha}>
                            <ReCAPTCHA sitekey="6LdJ5b0UAAAAAB-12UeOL5rbeWaekJw8twnofo1A"
                                size="normal" theme="dark" onChange={(token:string) => setContactData(state => ({ ...state, verify: token }))}
                                onExpired={() => setContactData(state => ({...state, verify: ''}))}
                            />
                        </div>
                    </div>

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

                        <Button disabled={!contactData.terms || contactData.verify === ''} {...sendBtnProps} caption="Send" />
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