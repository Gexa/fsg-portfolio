import * as React from 'react';
import { useRouter } from 'next/dist/client/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import styles from '../../../assets/scss/components/Header.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { routes as routeMap } from '../../../lib/routes';

const Header: React.FunctionComponent = (props?: any): JSX.Element => {

    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState('');
    const [activeSubMenu, setActiveSubMenu] = useState('');

    useEffect(() => {
        const splittedPath = router.asPath.split('/').filter( pth => {
            if (pth.length > 0) {
                return pth;
            }
        });

        setActiveMenu(splittedPath.length > 0 ? `/${splittedPath[0]}` : '/');
        setActiveSubMenu(splittedPath.length > 1 ? `/${splittedPath[1]}` : '');
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
                        const submenu = menuItem.sub && menuItem.sub.map( (subItem, subIndex) => {
                            return (
                                <li key={index + '_' + subIndex}>
                                    <Link href={menuItem.url + subItem.url}>
                                        <a className={activeSubMenu === subItem.url ? styles.activeSub : ''}>{subItem.title}</a>
                                    </Link>
                                </li>
                            )
                        })
                        return (
                            <li key={index}>
                                <Link href={menuItem.url}>
                                    <a className={activeMenu === menuItem.url ? styles.active : ''}>{menuItem.title}</a>
                                </Link>
                                {submenu ? <ul>{submenu}</ul> : null}
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