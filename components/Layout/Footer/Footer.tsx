import * as React from 'react';

import styles from '../../../assets/scss/components/Footer.module.scss';

const Footer = () => {
    return (
        <>
            <svg viewBox="0 40 500 60" preserveAspectRatio="none" className={styles.wave}>
                <rect x="0" y="0" width="500" height="500" style={{ stroke: 'none' }} />
                <path d="M0,50 C75,100 150,100 250,75 C250,75 350,50 500,55 L500,100 L0,100 Z" style={{ stroke: 'none' }}></path>
            </svg>

            <footer data-test="component-footer" className={[styles.footer, 'container-fluid'].join(' ')}>

                <div className={[styles.footerTop, 'container'].join(' ')}>

                    <div className={styles.contactWrapper}>
                        {/* <Contact /> */}
                    </div>

                    <blockquote className={styles.quoteWrapper}>
                        <em>In some ways, programming is like painting.
                            You start with a blank canvas and certain basic raw materials.
                            You use a combination of science, art,
                            and craft to determine what to do with them.</em>

                        <strong>Andrew Hunt</strong>
                    </blockquote>
                </div>

                <div data-test="copyright" className={[styles.copyright, 'container'].join(' ')}>Copyright &copy; Gexa'Software International Ltd. - All rights reserved!</div>
            </footer>
        </>
    );
}

export default Footer;