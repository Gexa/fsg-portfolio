import * as React from 'react';
import { useRouter } from 'next/dist/client/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import styles from '../../../assets/scss/components/Header.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { pages as routeMap } from '../../../lib/pages/';

const Header: React.FunctionComponent = (props?: any): JSX.Element => {

    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState('');

    useEffect(() => {
        setActiveMenu(router.asPath);
    }, [router.asPath])

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
                    {routeMap.map((menuItem, index) => {
                        return (
                            <li key={index}>
                                <Link href={menuItem.url}>
                                    <a className={activeMenu === menuItem.url ? styles.active : ''}>{menuItem.title}</a>
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