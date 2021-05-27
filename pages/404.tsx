import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import styles from '../assets/scss/pages/404.module.scss';

const Error404 = () => {
    const router = useRouter();

    return (
        <div className={styles.Error404Page}>
            <h1><span>404</span> error</h1>
            <p>The given URL does not exist on the server: <strong>{router.asPath}</strong></p>
        </div>
    );
}

export default Error404;