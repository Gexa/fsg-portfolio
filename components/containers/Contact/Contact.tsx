import * as React from 'react';
import useComponentVisible from '../../../lib/hooks/useComponentVisible';
import styles from '../../../assets/scss/components/Contact.module.scss';

const Contact: React.FunctionComponent = (): JSX.Element => {

    const [ contactData, setContactData ] = React.useState({ subject: '', sender: '', message: '' });
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    let formRef;

    const handleSubmit = event => {
        event.preventDefault();

    }

    const handleChange = (event, formField) => {
        event.preventDefault();
        setContactData( oldData => ({
            ...oldData,
            [formField]: event.target.value
        }));
    }

    return (
        <form method="POST"
            ref={ref}
            onSubmit={handleSubmit}
            className={styles.contactForm}
            data-test="component-contact">
                {isComponentVisible ?
                (<>
                    <input type="text" placeholder="Subject" autoComplete="off" className={styles.input} value={contactData.subject} onChange={e => handleChange(e, 'subject')} />
                    <input type="email" placeholder="Contact E-mail" className={styles.input} value={contactData.sender} onChange={e => handleChange(e, 'sender')} />
                    <textarea className={styles.message} autoComplete="off"
                            placeholder="Write your message here! Your message should be at least 20 characters long."
                            onChange={e => handleChange(e, 'message')}
                            value={contactData.message}></textarea>
                </>)
                :
                (<p onClick={e => setIsComponentVisible(true)}>
                    Leave a message, and tell us, how can we help you!? We will contact you ASAP, within 1-2 business days.
                </p>)}
        </form>
    );
}

export default Contact;