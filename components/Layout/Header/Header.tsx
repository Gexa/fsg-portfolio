import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../assets/scss/components/Header.module.scss';

const Header:React.FunctionComponent = (props?: any): JSX.Element => {
    return (
        <header className={[styles.header, 'd-flex'].join(' ')} data-test="component-header">
            <h1>
                <Link href="/">
                    <a id="logo" className={styles.logo}>
                        FSG
                    </a>
                </Link>
            </h1>
            <nav className={styles.navbar}>
                <ul>
                    <li>
                        <Link href="/developers/prof-1">Profil 1</Link>
                    </li>
                    <li>
                        <Link href="/developers/prof-2">Profil 2</Link>
                    </li>
                    <li>
                        <Link href="/developers/prof-3">Profil 3</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;