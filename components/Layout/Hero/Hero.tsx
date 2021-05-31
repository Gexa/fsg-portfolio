import * as React from 'react';

import styles from '../../../assets/scss/components/Hero.module.scss';

const Hero: React.FunctionComponent = ({ children }): JSX.Element => {
    return (
        <>
            <section data-test="component-hero" className={[styles.Hero, 'container-fluid'].join(' ')}>
                <div className={[styles.heroWrapper, 'container'].join(' ')}>
                    <div className={styles.content}>
                        {children && children}
                    </div>
                </div>
                <svg width="0" height="0">
                    <defs>
                        <clipPath id="headerCurve" clipPathUnits="objectBoundingBox">
                            <path d="M0,0.8 L0.6,0.8 C0.7,0.8 0.8,0.8 0.875,0.95 C0.9,0.8 1,0.8 1,0.8 L1,0 L0,0 Z" />
                        </clipPath>
                    </defs>
                </svg>
            </section>
        </>
    )
}

export default Hero;