import * as React from 'react';
import { useRouter } from 'next/dist/client/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import styles from '../../../assets/scss/components/Header.module.scss';

const Header: React.FunctionComponent = (props?: any): JSX.Element => {

    const routeMap = [
        { url: '/', title: 'Home' },
        { url: '/team', title: 'TEAM' },
        { url: '/technologies', title: 'Technologies' },
        { url: '/our-work', title: 'Our Work' },
        { url: '/contact', title: 'Contact us' },
    ];

    const router = useRouter();

    return (
        <header className={[styles.header, 'd-flex'].join(' ')} data-test="component-header">
            <h1>
                <Link href="/">
                    <a id="logo" className={styles.logo}>
                        LOGO
                    </a>
                </Link>
            </h1>
            <nav className={styles.navbar}>
                <ul>
                    {routeMap.map(menuItem => {
                        const isActive = router && router.asPath === menuItem.url;
                        return (
                            <li key={menuItem.url}>
                                <Link href={menuItem.url}>
                                    <a className={isActive ? styles.active : null}>{menuItem.title}</a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className={styles.social}>
                <a href="//github.com" target="_blank">
                    <FontAwesomeIcon icon={['fab', 'github']} />
                </a>
                <a href="//linkedin.com" target="_blank">
                    <FontAwesomeIcon icon={['fab', 'linkedin']} />
                </a>
            </div>
        </header>
    )
}

export default Header;