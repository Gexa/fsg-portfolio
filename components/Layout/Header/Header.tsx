import * as React from 'react';
import { useRouter } from 'next/dist/client/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Navigation from './Navigation/Navigation';

import styles from '../../../assets/scss/components/Header.module.scss';
import { routes as routeMap } from '../../../lib/routes';

const Header: React.FunctionComponent = (props?: any): JSX.Element => {

    const router = useRouter();
    const [activeMenu, setActiveMenu] = React.useState('');
    const [activeSubMenu, setActiveSubMenu] = React.useState('');
    const [activeHamburger, setActiveHamburger] = React.useState(false);

    React.useEffect(() => {
        const splittedPath = router.asPath.split('/').filter(pth => {
            if (pth.length > 0) {
                return pth;
            }
        });

        setActiveMenu(splittedPath.length > 0 ? `/${splittedPath[0]}` : '/');
        setActiveSubMenu(splittedPath.length > 1 ? `/${splittedPath[1]}` : '');
    }, [router.asPath])

    const toggleSideNavigation = event => {
        event.preventDefault();
        setActiveHamburger(oldState => !oldState);
    }

    const builtMenuSystem = (
        <ul>
            {routeMap.map((menuItem, index) => {
                const clickHandler = (event) => {
                    if (!activeHamburger) {
                        return;
                    }
                    event.preventDefault();
                    const linkTo = event.target.getAttribute('href');
                    if (linkTo.indexOf('#') === -1) {
                        router.push(linkTo);
                        toggleSideNavigation(event);
                    } else {
                        router.replace(linkTo);
                        toggleSideNavigation(event);
                    }
                };

                const submenu = menuItem.sub && menuItem.sub.map((subItem, subIndex) => {
                    return (
                        <li key={index + '_' + subIndex}>
                            <Link href={menuItem.url + subItem.url}>
                                <a className={activeSubMenu === subItem.url ? styles.activeSub : ''} onClick={clickHandler}>{subItem.title}</a>
                            </Link>
                        </li>
                    )
                })
                return (
                    <li key={index}>
                        <Link href={menuItem.url}>
                            <a className={activeMenu === menuItem.url ? styles.active : ''} onClick={clickHandler}>{menuItem.title}</a>
                        </Link>
                        {submenu ? <ul>{submenu}</ul> : null}
                    </li>
                )
            })}
        </ul>
    );

    const hamburgerBtn = () => (
        <button type="button"
            onClick={toggleSideNavigation}
            className={[styles.hamburger, activeHamburger ? styles.active : null].join(' ')}>
            <span></span>
        </button>
    );

    return (
        <>
            <header className={[styles.header].join(' ')} data-test="component-header">
                <div className="container d-flex">
                    <h1>
                        <Link href="/">
                            <a id="logo" className={styles.logo}>
                                LOGO
                            </a>
                        </Link>
                    </h1>
                    <nav className={styles.navbar}>
                        {builtMenuSystem}
                        {hamburgerBtn()}
                    </nav>

                    <div className={styles.social}>
                        <a href="//github.com" target="_blank">
                            <FontAwesomeIcon icon={['fab', 'github']} />
                        </a>
                        <a href="//linkedin.com" target="_blank">
                            <FontAwesomeIcon icon={['fab', 'linkedin']} />
                        </a>
                    </div>
                </div>
            </header>
            {<Navigation menu={builtMenuSystem} isActive={activeHamburger} Hamburger={hamburgerBtn} clicked={toggleSideNavigation} />}
        </>
    )
}

export default Header;