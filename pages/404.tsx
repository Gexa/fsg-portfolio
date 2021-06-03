import * as React from 'react';
import styles from '../assets/scss/pages/404.module.scss';

const Error404 = (props?) => {
    return (
        <div className={styles.Error404Page}>
            <h1><span>404</span> error</h1>
            <p>The given URL does not exist on the server.</p>
        </div>
    );
}

export async function getStaticProps(context) {
    console.log(context);
    return {
        props: {

        }
    }
}

export default Error404;